// MindMitra Riitu - Firebase Helper (REST API based - no modules needed)
// Uses Firestore REST API directly for maximum compatibility

(function() {
    const PROJECT_ID = "mindmitrariitu";
    const API_KEY    = "AIzaSyDJTsu7Qm-UdPNSTWHJaNbbrSbzptQUpLw";
    const BASE_URL   = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

    // -----------------------------------------------------------
    // REST API helpers
    // -----------------------------------------------------------
    async function restGet(colName) {
        try {
            const url = `${BASE_URL}/${colName}?key=${API_KEY}`;
            const res = await fetch(url);
            if (!res.ok) {
                console.warn(`Firestore REST GET failed for ${colName}: ${res.status} ${res.statusText}`);
                return [];
            }
            const json = await res.json();
            if (!json.documents) return [];
            return json.documents.map(d => {
                const id = d.name.split('/').pop();
                return { id, ...parseFirestoreFields(d.fields || {}) };
            });
        } catch (e) {
            console.warn(`Firestore REST GET error for ${colName}:`, e.message);
            return [];
        }
    }

    async function restPost(colName, data) {
        try {
            const url = `${BASE_URL}/${colName}?key=${API_KEY}`;
            const body = { fields: toFirestoreFields(data) };
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                const err = await res.text();
                console.error(`Firestore POST error for ${colName}:`, err);
                return { success: false, error: err };
            }
            const json = await res.json();
            const id = json.name.split('/').pop();
            return { success: true, id };
        } catch (e) {
            console.error(`Firestore REST POST error for ${colName}:`, e.message);
            return { success: false, error: e.message };
        }
    }

    async function restPatch(colName, docId, data) {
        try {
            const fields = toFirestoreFields(data);
            const updateMask = Object.keys(fields).map(k => `updateMask.fieldPaths=${k}`).join('&');
            const url = `${BASE_URL}/${colName}/${docId}?key=${API_KEY}&${updateMask}`;
            const body = { fields };
            const res = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!res.ok) return { success: false, error: await res.text() };
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    async function restDelete(colName, docId) {
        try {
            const url = `${BASE_URL}/${colName}/${docId}?key=${API_KEY}`;
            const res = await fetch(url, { method: 'DELETE' });
            if (!res.ok) return { success: false, error: await res.text() };
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    // -----------------------------------------------------------
    // Firestore value converters
    // -----------------------------------------------------------
    function toFirestoreFields(obj) {
        const fields = {};
        for (const [k, v] of Object.entries(obj)) {
            if (v === null || v === undefined) continue;
            if (typeof v === 'string')  fields[k] = { stringValue: v };
            else if (typeof v === 'number') fields[k] = { integerValue: String(v) };
            else if (typeof v === 'boolean') fields[k] = { booleanValue: v };
            else if (v instanceof Date) fields[k] = { timestampValue: v.toISOString() };
            else if (typeof v === 'object') fields[k] = { stringValue: JSON.stringify(v) };
        }
        // Always add createdAt server timestamp equivalent
        if (!fields.createdAt) {
            fields.createdAt = { timestampValue: new Date().toISOString() };
        }
        return fields;
    }

    function parseFirestoreFields(fields) {
        const obj = {};
        for (const [k, v] of Object.entries(fields)) {
            if (v.stringValue  !== undefined) obj[k] = v.stringValue;
            else if (v.integerValue !== undefined) obj[k] = parseInt(v.integerValue, 10);
            else if (v.doubleValue  !== undefined) obj[k] = parseFloat(v.doubleValue);
            else if (v.booleanValue !== undefined) obj[k] = v.booleanValue;
            else if (v.timestampValue !== undefined) {
                // Keep createdAt as an object with seconds so existing sort logic works
                const d = new Date(v.timestampValue);
                obj[k] = { seconds: Math.floor(d.getTime() / 1000), _dateStr: v.timestampValue };
            }
            else if (v.mapValue) obj[k] = parseFirestoreFields(v.mapValue.fields || {});
            else obj[k] = null;
        }
        return obj;
    }

    // -----------------------------------------------------------
    // Simple polling listener
    // -----------------------------------------------------------
    function makeListener(colName, sortFn) {
        return function(callback) {
            async function load() {
                const rows = await restGet(colName);
                if (sortFn) rows.sort(sortFn);
                console.log(`[Firebase] ${colName}: fetched ${rows.length} docs`);
                callback(rows);
            }
            load(); // immediate fetch
            const timer = setInterval(load, 30000); // refresh every 30s
            return () => clearInterval(timer);
        };
    }

    const byCreatedAt = (a, b) => {
        const tA = a.createdAt && a.createdAt.seconds ? a.createdAt.seconds : 0;
        const tB = b.createdAt && b.createdAt.seconds ? b.createdAt.seconds : 0;
        return tB - tA;
    };

    // -----------------------------------------------------------
    // window.FirebaseHelper  — available immediately (synchronous)
    // -----------------------------------------------------------
    window.FirebaseHelper = {

        // --- AUTH (using Firebase Auth REST API) ---
        signupUser: async function(name, email, password, extras = {}) {
            try {
                if (!password || password.length < 6)
                    return { success: false, error: "Password must be at least 6 characters." };
                const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, displayName: name, returnSecureToken: true })
                });
                const json = await res.json();
                if (json.error) {
                    let msg = json.error.message || "Signup failed.";
                    if (msg.includes('EMAIL_EXISTS')) msg = "This email is already registered.";
                    if (msg.includes('WEAK_PASSWORD')) msg = "Password must be at least 6 characters.";
                    if (msg.includes('INVALID_EMAIL')) msg = "Please enter a valid email address.";
                    return { success: false, error: msg };
                }
                localStorage.setItem('authToken', json.idToken);
                localStorage.setItem('userUid',   json.localId);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName',   name);
                localStorage.setItem('userEmail',  email);
                // Save user doc
                await restPost("users", { uid: json.localId, name, email, phone: extras.phone || '', gender: extras.gender || '' });
                return { success: true, user: { uid: json.localId, email, displayName: name } };
            } catch(e) {
                return { success: false, error: e.message };
            }
        },

        loginUser: async function(email, password) {
            try {
                const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, returnSecureToken: true })
                });
                const json = await res.json();
                if (json.error) {
                    let msg = json.error.message || "Login failed.";
                    if (msg.includes('INVALID_PASSWORD') || msg.includes('EMAIL_NOT_FOUND') || msg.includes('INVALID_LOGIN_CREDENTIALS')) msg = "Invalid email or password.";
                    return { success: false, error: msg };
                }
                localStorage.setItem('authToken', json.idToken);
                localStorage.setItem('userUid',   json.localId);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName',   json.displayName || email.split('@')[0]);
                localStorage.setItem('userEmail',  email);
                return { success: true, user: { uid: json.localId, email } };
            } catch(e) {
                return { success: false, error: e.message };
            }
        },

        sendPasswordResetEmail: async function(email) {
            try {
                if (!email) return { success: false, error: "Please enter your email address." };
                const cleanEmail = email.trim();
                const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ requestType: "PASSWORD_RESET", email: cleanEmail })
                });
                const json = await res.json();
                if (json.error) {
                    let msg = json.error.message || "Failed to send password reset email.";
                    if (msg.includes('EMAIL_NOT_FOUND')) msg = "No account found with this email address.";
                    if (msg.includes('INVALID_EMAIL')) msg = "Please enter a valid email address.";
                    return { success: false, error: msg };
                }

                // Log reset request in Firestore under MindMitra Riitu database
                await restPost("password_resets", {
                    email: cleanEmail,
                    senderName: "MindMitra Riitu Team",
                    senderEmail: "manurituraghav@gmail.com",
                    brand: "MindMitra Riitu – Chaldean Numerology & Astrology",
                    status: "Password Reset Link Dispatched",
                    sentAt: new Date().toISOString()
                });

                return { 
                    success: true, 
                    message: `Password reset link dispatched from MindMitra Riitu team to ${cleanEmail}! Please check your inbox & spam folder.` 
                };
            } catch(e) {
                return { success: false, error: e.message };
            }
        },

        logoutUser: async function() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userUid');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            return { success: true };
        },

        // --- SAVE helpers ---
        saveOrder: async function(data) {
            return await restPost("orders", {
                ...data,
                userId: localStorage.getItem('userUid') || 'guest',
                userEmail: localStorage.getItem('userEmail') || data.email || 'guest'
            });
        },

        saveAppointment: async function(data) {
            const result = await restPost("appointments", {
                ...data,
                userId: localStorage.getItem('userUid') || 'guest'
            });
            console.log("Appointment saved:", result.id || result.error);
            return result;
        },

        saveContact: async function(data) {
            return await restPost("contacts", {
                ...data,
                userId: localStorage.getItem('userUid') || 'guest'
            });
        },

        saveSubscriber: async function(email) {
            return await restPost("subscribers", { email });
        },

        saveProduct: async function(data) {
            const result = await restPost("products", data);
            console.log("Product saved:", result.id || result.error);
            return result;
        },

        deleteProduct: async function(id) {
            return await restDelete("products", id);
        },

        updateProduct: async function(id, data) {
            return await restPatch("products", id, data);
        },

        saveRemedy: async function(data) {
            return await restPost("remedies", data);
        },

        updateAppointmentStatus: async function(id, status) {
            return await restPatch("appointments", id, { status });
        },

        updateOrderStatus: async function(id, status) {
            return await restPatch("orders", id, { status });
        },

        // --- FETCH listeners ---
        onProductsUpdate:      makeListener("products",     byCreatedAt),
        onAppointmentsUpdate:  makeListener("appointments", byCreatedAt),
        onOrdersUpdate:        makeListener("orders",       byCreatedAt),
        onContactsUpdate:      makeListener("contacts",     byCreatedAt),
        onUsersUpdate:         makeListener("users",        byCreatedAt),
        onRemediesUpdate:      makeListener("remedies",     byCreatedAt)
    };

    // Auth UI update
    if (window.updateAuthUI) window.updateAuthUI();

    console.log("✅ FirebaseHelper (REST API) ready.");
})();
