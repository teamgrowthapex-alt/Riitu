// MindMitra Riitu - Dynamic Dashboards Logic (Admin & Client Portals)

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ----------------------------------------------------
// 1. ADMIN DASHBOARD ENGINE
// ----------------------------------------------------
window.initAdminDashboard = function() {
    if (!window.FirebaseHelper) {
        setTimeout(window.initAdminDashboard, 100);
        return;
    }
    console.log("⚡ Initializing Admin Portal...");

    // Check Auth Role
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole') || 'admin';
    if (!isLoggedIn) {
        console.warn("User not logged in as admin. Session warning.");
    }

    let allClientsMap = {};

    function renderClientTable() {
        const $tbody = $('#adminClientList');
        const $select = $('#remedyClientSelect');
        if (!$tbody.length) return;

        $tbody.empty();
        if ($select.length) {
            $select.empty().append('<option value="">-- Choose Client --</option>');
        }

        const clientList = Object.values(allClientsMap);
        $('#adminTotalClients').text(clientList.length || 0);

        if (clientList.length === 0) {
            $tbody.append(`<tr><td colspan="7" class="text-center text-muted">No client records found.</td></tr>`);
            return;
        }

        clientList.forEach((c, idx) => {
            const name = c.name || 'Client User';
            const phone = c.phone || '+91 87967 33997';
            const email = c.email || 'client@mindmitra.com';
            const dob = c.dob || '14/05/1988';
            const regDate = c.date || 'Active';

            $tbody.append(`
                <tr>
                    <td>${idx + 1}</td>
                    <td><strong>${escapeHtml(name)}</strong></td>
                    <td>${escapeHtml(phone)}</td>
                    <td>${escapeHtml(email)}</td>
                    <td>${escapeHtml(dob)}</td>
                    <td><span class="badge_tag tag_purple">${escapeHtml(regDate)}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-purple" style="border-color:#7b4397; color:#7b4397; font-weight:600; font-size:12px;" onclick="openAddRemedyModal('${escapeHtml(name)}', '${escapeHtml(email)}')">Add Remedy</button>
                    </td>
                </tr>
            `);

            if ($select.length) {
                $select.append(`<option value="${escapeHtml(name)}|${escapeHtml(email)}">${escapeHtml(name)} (${escapeHtml(phone)})</option>`);
            }
        });
    }

    // A. Listen for Registered Users
    window.FirebaseHelper.onUsersUpdate((users) => {
        if (users[0] && users[0].error === "PERMISSION_DENIED") {
            const $tbody = $('#adminClientList');
            if ($tbody.length) {
                $tbody.empty().append(`<tr><td colspan="7" class="text-center" style="color:#d9534f; padding:20px;">
                    <i class="fa fa-lock" style="font-size:24px; margin-bottom:10px; display:block;"></i>
                    <strong>Firebase Permission Denied</strong><br>
                    Your Firestore Database rules are blocking read access.
                </td></tr>`);
                $('#adminTotalClients').text('0');
            }
            return;
        }

        users.forEach(u => {
            if (u.email || u.name) {
                const key = (u.email || u.name).toLowerCase();
                allClientsMap[key] = {
                    name: u.name || 'Registered User',
                    phone: u.phone || '+91 87967 33997',
                    email: u.email || 'client@mindmitra.com',
                    dob: u.gender ? `Gender: ${u.gender}` : '14/05/1988',
                    date: u.createdAt && u.createdAt.seconds ? new Date(u.createdAt.seconds * 1000).toLocaleDateString('en-IN') : 'Registered'
                };
            }
        });
        renderClientTable();
    });

    // B. Listen for Orders & Payments
    window.FirebaseHelper.onOrdersUpdate((orders) => {
        const $ordersList = $('#adminOrdersList');
        if (!$ordersList.length) return;

        $ordersList.empty();

        if (!orders || orders.length === 0) {
            $ordersList.append(`<tr><td colspan="7" class="text-center text-muted" style="padding:30px;">
                <i class="fa fa-inbox" style="font-size:28px; display:block; margin-bottom:8px; color:#bbb;"></i>
                No payment orders received yet. Orders will appear here after customers complete checkout.
            </td></tr>`);
            $('#adminTotalRevenue').text('₹ 0');
            return;
        }

        let totalRevenue = 0;

        orders.forEach((ord) => {
            const rawTotal = (ord.total || "0").toString().replace(/[^0-9.]/g, '');
            const amount = parseInt(rawTotal || "0", 10);
            totalRevenue += amount;

            // Add customer to clients list map
            if (ord.customerName || ord.email) {
                const key = (ord.email || ord.customerName).toLowerCase();
                if (!allClientsMap[key]) {
                    allClientsMap[key] = {
                        name: ord.customerName || 'Customer',
                        phone: ord.phone || '',
                        email: ord.email || '',
                        dob: 'Customer Order',
                        date: 'Purchased'
                    };
                }
            }

            const dateStr = ord.createdAt && ord.createdAt.seconds 
                ? new Date(ord.createdAt.seconds * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                : 'Recent';

            const txnId = ord.paymentId 
                ? `<span style="font-family:monospace; font-size:11px;">${escapeHtml(ord.paymentId)}</span>`
                : `<strong>#MM-${(ord.id || 'ORD').slice(-6).toUpperCase()}</strong>`;

            let prodTitle = ord.product || '';
            if (!prodTitle && ord.items) {
                try {
                    const parsed = typeof ord.items === 'string' ? JSON.parse(ord.items) : ord.items;
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        prodTitle = parsed.map(i => `${i.title || 'Item'} (x${i.qty || 1})`).join(', ');
                    }
                } catch(e) {}
            }
            if (!prodTitle) prodTitle = 'Astrology / Numerology Service';

            $ordersList.append(`
                <tr>
                    <td>${txnId}</td>
                    <td><strong>${escapeHtml(ord.customerName || ord.name || 'Customer')}</strong><br><small style="color:#666;">${escapeHtml(ord.phone || '')} | ${escapeHtml(ord.userEmail || ord.email || '')}</small></td>
                    <td>${escapeHtml(prodTitle)}</td>
                    <td><span class="badge_tag tag_purple">${escapeHtml(ord.paymentMethod || 'Razorpay / UPI')}</span></td>
                    <td><strong style="color:#7b4397;">₹ ${amount.toLocaleString('en-IN')}</strong></td>
                    <td>${dateStr}</td>
                    <td><span class="badge_tag tag_green">${escapeHtml(ord.status || ord.paymentStatus || 'Success')}</span></td>
                </tr>
            `);
        });

        $('#adminTotalRevenue').text(`₹ ${totalRevenue.toLocaleString('en-IN')}`);
        renderClientTable();
    });


    // C. Listen for Appointments
    window.FirebaseHelper.onAppointmentsUpdate((appointments) => {
        const $aptList = $('#adminAppointmentsList');
        if (!$aptList.length) return;

        $aptList.empty();

        if (!appointments || appointments.length === 0) {
            $aptList.append(`<tr><td colspan="7" class="text-center text-muted">No appointments found in database.</td></tr>`);
            $('#adminTotalConsultations').text('0');
            return;
        }

        if (appointments[0] && appointments[0].error === "PERMISSION_DENIED") {
            $aptList.append(`<tr><td colspan="7" class="text-center" style="color:#d9534f; padding:20px;">
                <i class="fa fa-lock" style="font-size:24px; margin-bottom:10px; display:block;"></i>
                <strong>Firebase Permission Denied</strong><br>
                Your Firestore Database rules are blocking read access.<br>
                Go to Firebase Console &rarr; Firestore Database &rarr; Rules, and change to: <code>allow read, write: if true;</code>
            </td></tr>`);
            $('#adminTotalConsultations').text('0');
            return;
        }

        appointments.forEach((apt) => {
            // Add apt client to clients map
            if (apt.name || apt.email) {
                const key = (apt.email || apt.name).toLowerCase();
                if (!allClientsMap[key]) {
                    allClientsMap[key] = {
                        name: apt.name || 'Consultation Client',
                        phone: apt.phone || apt.mobile || '+91 98765 12345',
                        email: apt.email || 'client@gmail.com',
                        dob: 'Consultation Booking',
                        date: 'Booked'
                    };
                }
            }

            const dateStr = apt.date || (apt.createdAt && apt.createdAt.seconds ? new Date(apt.createdAt.seconds * 1000).toLocaleDateString('en-IN') : 'Scheduled');
            const statusClass = apt.status === 'Confirmed' ? 'tag_green' : (apt.status === 'Completed' ? 'tag_purple' : 'tag_orange');

            $aptList.append(`
                <tr>
                    <td><strong>#APT-${(apt.id || '').slice(-5).toUpperCase()}</strong></td>
                    <td><strong>${escapeHtml(apt.name || 'Client')}</strong><br><small class="text-muted">${escapeHtml(apt.email || '')}</small></td>
                    <td>${escapeHtml(apt.phone || apt.mobile || 'N/A')}</td>
                    <td><span class="badge_tag tag_purple">${escapeHtml(apt.type || 'Zoom Consultation')}</span></td>
                    <td>${escapeHtml(dateStr)}</td>
                    <td><span class="badge_tag ${statusClass}">${escapeHtml(apt.status || 'Pending')}</span></td>
                    <td>
                        <button class="btn btn-sm btn-success" style="font-size:11px; padding:3px 10px;" onclick="updateAppointmentState('${apt.id}', 'Confirmed')">Confirm</button>
                        <button class="btn btn-sm btn-secondary" style="font-size:11px; padding:3px 10px; margin-left:4px;" onclick="updateAppointmentState('${apt.id}', 'Completed')">Complete</button>
                    </td>
                </tr>
            `);
        });
        $('#adminTotalConsultations').text(appointments.length);
        renderClientTable();
    });

    // D. Listen for Contact Messages / Queries
    window.FirebaseHelper.onContactsUpdate((contacts) => {
        const $msgList = $('#adminMessagesList');
        if ($msgList.length) {
            $msgList.empty();
            if (!contacts || contacts.length === 0) {
                $msgList.append(`<tr><td colspan="5" class="text-center text-muted">No user messages received yet.</td></tr>`);
            } else if (contacts[0].error === "PERMISSION_DENIED") {
                $msgList.append(`<tr><td colspan="5" class="text-center" style="color:#d9534f; padding:20px;">
                    <i class="fa fa-lock" style="font-size:24px; margin-bottom:10px; display:block;"></i>
                    <strong>Firebase Permission Denied</strong>
                </td></tr>`);
            } else {
                contacts.forEach((c) => {
                    const dateStr = c.createdAt && c.createdAt.seconds 
                        ? new Date(c.createdAt.seconds * 1000).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })
                        : 'Recently';
                    $msgList.append(`
                        <tr>
                            <td><strong>${escapeHtml(c.name || 'Anonymous')}</strong></td>
                            <td>${escapeHtml(c.email || 'N/A')}</td>
                            <td><span class="badge_tag tag_purple">${escapeHtml(c.subject || 'General Enquiry')}</span></td>
                            <td style="max-width:300px; white-space:normal;">${escapeHtml(c.message || '')}</td>
                            <td><small class="text-muted">${dateStr}</small></td>
                        </tr>
                    `);
                });
            }
        }
    });

    // E. Listen for Shop Products
    window.FirebaseHelper.onProductsUpdate((products) => {
        const $prodList = $('#adminProductsList');
        if (!$prodList.length) return;

        $prodList.empty();
        if (!products || products.length === 0) {
            $prodList.append(`<tr><td colspan="5" class="text-center text-muted">No products found. Add your first E-Book or Service!</td></tr>`);
            $('#adminTotalProducts').text('0');
        } else {
            products.forEach((p) => {
                $prodList.append(`
                    <tr>
                        <td><img src="${p.img || 'images/header/astrology_numerology_transparent.png'}" style="width:40px; height:40px; object-fit:contain; border-radius:4px;"></td>
                        <td><strong>${escapeHtml(p.title)}</strong></td>
                        <td><strong style="color:#7b4397;">₹ ${p.price}</strong> ${p.origPrice ? `<del style="color:#999; font-size:12px;">₹ ${p.origPrice}</del>` : ''}</td>
                        <td><span class="badge_tag tag_purple">${escapeHtml(p.category || 'Numerology')}</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary" style="font-size:11px; padding:3px 8px; margin-right:4px;" onclick="editShopProductPrice('${p.id}', '${p.price}', '${p.origPrice || ''}')"><i class="fa fa-pencil"></i> Edit Price</button>
                            <button class="btn btn-sm btn-outline-danger" style="font-size:11px; padding:3px 8px;" onclick="deleteShopProduct('${p.id}')"><i class="fa fa-trash"></i> Delete</button>
                        </td>
                    </tr>
                `);
            });
            $('#adminTotalProducts').text(products.length);
        }
    });
};

// ----------------------------------------------------
// 2. CLIENT DASHBOARD ENGINE
// ----------------------------------------------------
window.initClientDashboard = function() {
    if (!window.FirebaseHelper) {
        setTimeout(window.initClientDashboard, 100);
        return;
    }

    console.log("⚡ Initializing Dynamic Client Portal...");

    const userEmail = (localStorage.getItem('userEmail') || '').toLowerCase().trim();
    const userName = localStorage.getItem('userName') || 'Client User';
    const userPhone = localStorage.getItem('userPhone') || '+91 87967 33997';

    $('#navClientName').text(`Welcome, ${userName}`);
    $('#bannerClientName').text(userName);
    $('#profileName').text(userName);
    $('#profileEmail').text(userEmail || 'client@mindmitra.com');
    $('#profileMobile').text(userPhone);

    // Calculate Life Path Number based on name length or random life path number 1-9
    let sum = 0;
    for (let i = 0; i < userName.length; i++) sum += userName.charCodeAt(i);
    const lifePath = (sum % 9) + 1;
    $('#statLifePath').text(lifePath);

    // Listen for Client's Appointments
    window.FirebaseHelper.onAppointmentsUpdate((appointments) => {
        const $tbody = $('#consultationTableBody');
        if (!$tbody.length) return;
        $tbody.empty();

        const userApts = appointments.filter(a => 
            !userEmail || (a.email && a.email.toLowerCase().includes(userEmail)) || (a.name && a.name.toLowerCase().includes(userName.toLowerCase()))
        );

        const listToRender = userApts;
        $('#statConsultations').text(listToRender.length);

        if (listToRender.length === 0) {
            $tbody.append('<tr><td colspan="4" class="text-center text-muted py-3">No consultations found. Book your first session!</td></tr>');
            return;
        }

        listToRender.forEach((apt) => {
            const dateStr = apt.date || 'Scheduled Slot';
            const statusClass = apt.status === 'Confirmed' ? 'badge_confirmed' : 'badge_pending';
            $tbody.append(`
                <tr>
                    <td><strong>${escapeHtml(dateStr)}</strong></td>
                    <td>${escapeHtml(apt.type || 'Numerology & Kundli Session')}</td>
                    <td>Online Zoom / Call</td>
                    <td><span class="badge_status ${statusClass}">${escapeHtml(apt.status || 'Confirmed')}</span></td>
                </tr>
            `);
        });
    });

    // Listen for Client's Orders & Payments
    window.FirebaseHelper.onOrdersUpdate((orders) => {
        const $tbody = $('#clientOrdersTableBody');
        const $tbodyDownloads = $('#clientDownloadsTableBody');
        let totalSpent = 0;

        const userOrders = orders.filter(o => 
            !userEmail || (o.userEmail && o.userEmail.toLowerCase().includes(userEmail)) || (o.email && o.email.toLowerCase().includes(userEmail)) || (o.customerName && o.customerName.toLowerCase().includes(userName.toLowerCase()))
        );

        const listToRender = userOrders;

        if ($tbody.length) {
            $tbody.empty();
            if ($tbodyDownloads.length) $tbodyDownloads.empty();

            if (listToRender.length === 0) {
                $tbody.append('<tr><td colspan="5" class="text-center text-muted py-3">No payment history found.</td></tr>');
            }

            listToRender.forEach((ord) => {
                const rawTotal = (ord.total || "499").toString().replace(/[^0-9]/g, '');
                const amount = parseInt(rawTotal || "499", 10);
                totalSpent += amount;

                const dateStr = ord.createdAt && ord.createdAt.seconds 
                    ? new Date(ord.createdAt.seconds * 1000).toLocaleDateString('en-IN')
                    : 'Recent';

                $tbody.append(`
                    <tr>
                        <td><strong>#MM-${(ord.id || 'ORD').slice(-5).toUpperCase()}</strong></td>
                        <td>${escapeHtml(ord.product || 'E-Book / Service')}</td>
                        <td><strong style="color:#7b4397;">₹ ${amount}</strong></td>
                        <td>${dateStr}</td>
                        <td><span class="badge_status badge_paid">${escapeHtml(ord.status || 'Completed')}</span></td>
                    </tr>
                `);

                if ($tbodyDownloads.length && (ord.product || '').toLowerCase().includes('book') || (ord.product || '').toLowerCase().includes('report')) {
                    $tbodyDownloads.append(`
                        <tr>
                            <td><strong>${escapeHtml(ord.product || 'Purchased Item')}</strong></td>
                            <td>${dateStr}</td>
                            <td>
                                <a href="javascript:showToast('Downloading your PDF document...', 'success')" style="background:#570680; color:#fff; padding:6px 14px; border-radius:20px; font-size:12px; font-weight:700; text-decoration:none; display:inline-block;">
                                    <i class="fa fa-download"></i> Download PDF
                                </a>
                            </td>
                        </tr>
                    `);
                }
            });
            
            // If no downloads found, show a message
            if ($tbodyDownloads.length && $tbodyDownloads.children().length === 0) {
                $tbodyDownloads.append('<tr><td colspan="3" class="text-center text-muted py-3">No digital downloads available yet.</td></tr>');
            }
        } else {
            listToRender.forEach((ord) => {
                const rawTotal = (ord.total || "499").toString().replace(/[^0-9]/g, '');
                totalSpent += parseInt(rawTotal || "499", 10);
            });
        }

        $('#statPayments').text(`₹ ${totalSpent.toLocaleString('en-IN')}`);
    });

    // Listen for Remedies Prescribed by Admin
    window.FirebaseHelper.onRemediesUpdate((remedies) => {
        const $container = $('#clientRemediesContainer');
        if (!$container.length) return;

        const userRemedies = remedies.filter(r => 
            !userEmail || 
            (r.clientEmail && r.clientEmail.toLowerCase().includes(userEmail)) || 
            (r.clientName && r.clientName.toLowerCase().includes(userName.toLowerCase())) ||
            (r.clientVal && r.clientVal.toLowerCase().includes(userName.toLowerCase()))
        );

        const listToRender = userRemedies;
        $('#statRemedies').text(listToRender.length);

        if (listToRender.length === 0) {
            $container.html(`<div class="remedy_box"><p class="text-muted mb-0" style="font-size: 14px;">No remedies prescribed yet. Consult with Riitu Ma'am for personalized guidance.</p></div>`);
        } else {
            $container.empty();
            listToRender.forEach((rem) => {
                $container.append(`
                    <div class="remedy_box">
                        <h5>✨ ${escapeHtml(rem.title || 'Personal Cosmic Remedy')}</h5>
                        <p style="font-size: 13px; margin: 0; color: #555;">${escapeHtml(rem.description || rem.desc || rem.instructions || '')}</p>
                    </div>
                `);
            });
        }
    });
};

// Global Handler Functions
window.updateAppointmentState = async function(id, status) {
    if (window.FirebaseHelper) {
        const res = await window.FirebaseHelper.updateAppointmentStatus(id, status);
        if (res.success) {
            if (window.showToast) window.showToast(`✓ Appointment status updated to ${status}`, "success");
            else alert(`Appointment updated to ${status}`);
        }
    }
};

window.deleteShopProduct = async function(id) {
    if (confirm("Are you sure you want to delete this product from shop?")) {
        if (window.FirebaseHelper) {
            await window.FirebaseHelper.deleteProduct(id);
            if (window.showToast) window.showToast("Product deleted successfully.", "success");
        }
    }
};

window.openAddRemedyModal = function(clientName, clientEmail) {
    $('#adminTab button[data-bs-target="#remedies"]').tab('show');
    if (clientName) {
        const valToSet = $('#remedyClientSelect option').filter(function() {
            return $(this).text().includes(clientName);
        }).val();
        if (valToSet) $('#remedyClientSelect').val(valToSet);
    }
};

window.handleAdminLogout = function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    if (window.FirebaseHelper) window.FirebaseHelper.logoutUser();
    window.location.href = 'index.html';
};

window.handleLogout = function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    if (window.FirebaseHelper) window.FirebaseHelper.logoutUser();
    window.location.href = 'index.html';
};

// Form Handlers
$(document).ready(function() {
    // Add Product Form
    $('#addProductAdminForm').on('submit', async function(e) {
        e.preventDefault();
        const title = $('#prodTitle').val();
        const price = $('#prodPrice').val();
        const origPrice = $('#prodOrigPrice').val() || '';
        const category = $('#prodCategory').val();
        const img = $('#prodImg').val();
        const desc = $('#prodDesc').val();

        if (window.FirebaseHelper) {
            const res = await window.FirebaseHelper.saveProduct({ title, price, origPrice, category, img, desc });
            if (res.success) {
                if (window.showToast) window.showToast("🎉 Product published successfully!", "success");
                else alert("Product published successfully!");
                $('#addProductAdminForm')[0].reset();
            } else {
                if (window.showToast) window.showToast("Error saving product: " + res.error, "error");
                else alert("Error: " + res.error);
                console.error("Save product failed:", res.error);
            }
        }
    });

    // Save Remedy Form
    $('#remedyFormAdmin, form[onsubmit*="saveRemedyForm"]').on('submit', async function(e) {
        e.preventDefault();
        const clientVal = $('#remedyClientSelect').val() || 'General Client';
        const title = $('#remedyTitle').val();
        const description = $('#remedyDesc').val();

        const parts = clientVal.split('|');
        const clientName = parts[0] || clientVal;
        const clientEmail = parts[1] || '';

        if (window.FirebaseHelper) {
            const res = await window.FirebaseHelper.saveRemedy({ clientVal, clientName, clientEmail, title, description });
            if (res.success) {
                if (window.showToast) showToast("✨ Remedy Published to Client Dashboard!", "success");
                else alert("Remedy published successfully!");
                $('#remedyTitle').val('');
                $('#remedyDesc').val('');
            }
        }
    });
});

// ----------------------------------------------------
// 3. DYNAMIC SHOP PAGE CONTROLLER (Sidebar Filters & Realtime Firestore Products)
// ----------------------------------------------------
let allShopProductsList = [];
let currentCategoryFilter = 'all';

window.initShopPage = function() {
    if (!window.FirebaseHelper) {
        setTimeout(window.initShopPage, 100);
        return;
    }
    console.log("⚡ Initializing Shop Page with Firestore...");

    const initialDefaultProducts = [
        {
            title: "Chaldean Numerology Master E-Book",
            price: "199",
            origPrice: "499",
            category: "ebooks",
            img: "images/header/astrology_numerology_transparent.png",
            desc: "Master the secret science of compound numbers, name alignment & date remedies."
        },
        {
            title: "Natural Yellow Sapphire (Pukhraj)",
            price: "4999",
            origPrice: "7500",
            category: "gemstones",
            img: "images/content/service_1.png",
            desc: "100% Certified 5.25 Ratti Ceylon Pukhraj for Jupiter prosperity & career growth."
        },
        {
            title: "5 Mukhi Indonesian Rudraksha Mala",
            price: "899",
            origPrice: "1500",
            category: "remedies",
            img: "images/content/service_2.png",
            desc: "108+1 Bead Authentic Rudraksha Mala energized with Lord Shiva Vedic mantras."
        },
        {
            title: "Shree Kuber Dhan Varsha Yantra",
            price: "1299",
            origPrice: "2100",
            category: "yantras",
            img: "images/content/service_3.png",
            desc: "Heavy Brass 24K Gold Plated Kuber Yantra for wealth & financial breakthrough."
        },
        {
            title: "Vastu Energy Correction Pyramid",
            price: "1499",
            origPrice: "2499",
            category: "yantras",
            img: "images/content/service_4.png",
            desc: "Multi-layered lead & copper pyramid to neutralize North-East & South-West doshas."
        },
        {
            title: "Emerald (Panna) Certified Gemstone",
            price: "5499",
            origPrice: "8999",
            category: "gemstones",
            img: "images/content/service_5.png",
            desc: "Zambian Natural Emerald for Mercury intelligence, communication & business growth."
        }
    ];

    window.FirebaseHelper.onProductsUpdate(async (products) => {
        // If Firestore products collection is empty, seed defaults!
        if (!products || products.length === 0) {
            console.log("Seeding initial shop products to Firestore...");
            let seedSuccess = true;
            for (let prod of initialDefaultProducts) {
                const res = await window.FirebaseHelper.saveProduct(prod);
                if (!res.success) {
                    seedSuccess = false;
                    break;
                }
            }
            if (!seedSuccess) {
                console.warn("Firestore seeding failed (likely permission denied). Falling back to memory array.");
                allShopProductsList = initialDefaultProducts.map((p, i) => ({ id: 'mock_' + i, ...p }));
                renderShopGrid();
            }
            return;
        }

        allShopProductsList = products;
        renderShopGrid();
    });
};

window.renderShopGrid = function() {
    const $container = $('#shopProductsContainer');
    if (!$container.length) return;

    $container.empty();
    const searchTerm = ($('#shopSearchInput').val() || '').toLowerCase().trim();
    const sortVal = $('#shopSortSelect').val() || 'featured';

    let filtered = allShopProductsList.filter(p => {
        const cat = (p.category || '').toLowerCase();
        const title = (p.title || '').toLowerCase();
        const desc = (p.desc || '').toLowerCase();

        // Category filter
        let matchCat = true;
        if (currentCategoryFilter !== 'all') {
            matchCat = cat.includes(currentCategoryFilter) || 
                       (currentCategoryFilter === 'ebooks' && (cat.includes('book') || cat.includes('guide'))) ||
                       (currentCategoryFilter === 'gemstones' && (cat.includes('gem') || cat.includes('stone') || cat.includes('pukhraj') || cat.includes('panna'))) ||
                       (currentCategoryFilter === 'remedies' && (cat.includes('rudraksha') || cat.includes('remedy'))) ||
                       (currentCategoryFilter === 'yantras' && (cat.includes('yantra') || cat.includes('pyramid')));
        }

        // Search filter
        let matchSearch = !searchTerm || title.includes(searchTerm) || desc.includes(searchTerm) || cat.includes(searchTerm);

        return matchCat && matchSearch;
    });

    // Sorting
    if (sortVal === 'low-high') {
        filtered.sort((a, b) => parseInt(a.price || 0, 10) - parseInt(b.price || 0, 10));
    } else if (sortVal === 'high-low') {
        filtered.sort((a, b) => parseInt(b.price || 0, 10) - parseInt(a.price || 0, 10));
    }

    $('#shopProductCount').text(filtered.length);

    // Update sidebar category counts dynamically
    const catCounts = {
        all: allShopProductsList.length,
        gemstones: 0,
        ebooks: 0,
        remedies: 0,
        yantras: 0
    };
    allShopProductsList.forEach(p => {
        const cat = (p.category || '').toLowerCase();
        if (cat.includes('gem') || cat.includes('stone') || cat.includes('pukhraj') || cat.includes('panna')) catCounts.gemstones++;
        if (cat.includes('book') || cat.includes('guide')) catCounts.ebooks++;
        if (cat.includes('rudraksha') || cat.includes('remedy')) catCounts.remedies++;
        if (cat.includes('yantra') || cat.includes('pyramid')) catCounts.yantras++;
    });

    const updateSidebarCount = (index, count) => {
        $('#shopCategoryList .shop-cat-btn').eq(index).find('span').last().text(`(${count})`);
    };
    updateSidebarCount(0, catCounts.all);
    updateSidebarCount(1, catCounts.gemstones);
    updateSidebarCount(2, catCounts.ebooks);
    updateSidebarCount(3, catCounts.remedies);
    updateSidebarCount(4, catCounts.yantras);

    if (filtered.length === 0) {
        $container.html(`
            <div class="col-12 text-center py-5">
                <i class="fa fa-search" style="font-size:40px; color:#ccc; margin-bottom:15px; display:block;"></i>
                <h5 style="color:#666;">No products found matching your filter.</h5>
                <p style="font-size:13px; color:#999;">Try searching with a different term or select 'All Products'.</p>
            </div>
        `);
        return;
    }

    filtered.forEach(p => {
        const price = parseInt(p.price || "199", 10).toLocaleString('en-IN');
        const origPrice = p.origPrice ? parseInt(p.origPrice, 10).toLocaleString('en-IN') : '';

        $container.append(`
            <div class="col-lg-4 col-md-6 col-sm-6 col-12" style="margin-bottom: 30px;">
                <div class="product-card-single">
                    <div class="product_img_holder">
                        <span class="product_badge">AUTHENTIC</span>
                        <img src="${p.img || 'images/header/astrology_numerology_transparent.png'}" alt="${escapeHtml(p.title)}">
                    </div>
                    <div class="product_body">
                        <h4 class="product_title"><a href="shop_single.html">${escapeHtml(p.title)}</a></h4>
                        <div class="product_rating">
                            <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                            <span>(4.9)</span>
                        </div>
                        <div class="product_price">
                            ₹ ${price}
                            ${origPrice ? `<del>₹ ${origPrice}</del>` : ''}
                        </div>
                        <div class="product_btn_group">
                            <button class="btn_add_cart" onclick="addToCart('${escapeHtml(p.title)}', '${p.price}', '${p.img || ''}')">Add To Cart</button>
                            <button class="btn_buy_now" onclick="buyNowProduct('${escapeHtml(p.title)}', '${p.price}', '${p.img || ''}')">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
};

window.buyNowProduct = function(title, price, img) {
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        if (window.showToast) {
            showToast("🔒 Please Log In or Sign Up first to buy products!", "warning");
        }
        if (window.jQuery && window.jQuery.magnificPopup) {
            window.jQuery.magnificPopup.open({
                items: { src: '#login-dialog' },
                type: 'inline',
                fixedContentPos: false,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                midClick: true,
                mainClass: 'my-mfp-zoom-in'
            });
        } else {
            alert("🔒 Please Log In or Sign Up first to buy products!");
        }
        return false;
    }
    localStorage.setItem('checkoutItemName', title);
    localStorage.setItem('checkoutItemPrice', String(price));
    if (img) localStorage.setItem('checkoutItemImg', img);
    window.location.href = 'checkout.html';
};

window.selectCategory = function(cat, btn) {
    currentCategoryFilter = cat;
    $('.shop-cat-btn').removeClass('active');
    $(btn).addClass('active');
    renderShopGrid();
};

window.filterShopProducts = function() {
    renderShopGrid();
};

window.sortShopProducts = function() {
    renderShopGrid();
};

window.addToCart = function(title, price, img) {
    try {
        var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            if (window.showToast) {
                showToast("🔒 Please Log In or Sign Up first to add items to your cart & shop!", "warning");
            }
            if (window.jQuery && window.jQuery.magnificPopup) {
                window.jQuery.magnificPopup.open({
                    items: { src: '#login-dialog' },
                    type: 'inline',
                    fixedContentPos: false,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    midClick: true,
                    mainClass: 'my-mfp-zoom-in'
                });
            } else {
                alert("🔒 Please Log In or Sign Up first to add items to your cart & shop!");
            }
            return false;
        }

        var cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        // Check if already in cart
        var existing = cart.find(function(i) { return i.title === title; });
        if (existing) {
            existing.qty = (existing.qty || 1) + 1;
        } else {
            cart.push({ title: title, price: String(price), img: img || '', qty: 1 });
        }
        localStorage.setItem('cartItems', JSON.stringify(cart));
        var total = cart.reduce(function(s,i){ return s + (i.qty||1); }, 0);
        var badge = document.getElementById('cartCountBadge');
        if (badge) badge.textContent = total;
        if (window.updateCartUI) window.updateCartUI();
        if (window.showToast) {
            showToast('🛒 "' + title + '" added to cart! <a href="cart" style="color:#fff;text-decoration:underline;">View Cart</a>', "success");
        } else {
            alert('"' + title + '" added to cart! (₹' + price + ')');
        }
    } catch(e) {
        console.error('addToCart error:', e);
        alert('"' + title + '" added to cart!');
    }
};

window.editShopProductPrice = async function(id, currentPrice, currentOrigPrice) {
    const newPrice = prompt("Enter new Selling Price (₹):", currentPrice);
    if (newPrice === null || newPrice.trim() === "") return;
    const newOrigPrice = prompt("Enter Original MRP Price (₹) [optional]:", currentOrigPrice || "");
    
    if (window.FirebaseHelper) {
        const res = await window.FirebaseHelper.updateProduct(id, { 
            price: newPrice.trim(), 
            origPrice: newOrigPrice ? newOrigPrice.trim() : "" 
        });
        if (res.success) {
            if (window.showToast) showToast("✓ Product price updated successfully in Firebase!", "success");
            else alert("Price updated successfully!");
        }
    }
};
