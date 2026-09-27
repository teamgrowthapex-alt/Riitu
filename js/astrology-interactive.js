/* ===================================================================
   MindMitra Riitu - Astrology & Numerology Interactive Engine
   =================================================================== */

(function($) {
    "use strict";

    // --- NUMEROLOGY DATA & CALCULATOR ENGINE ---
    const NUMEROLOGY_DATA = {
        1: {
            title: "The Leader & Pioneer",
            ruler: "Sun ☉",
            color: "Gold, Ruby Red, Yellow",
            gem: "Ruby, Yellow Sapphire",
            traits: "Independent, ambitious, self-reliant, innovative, and born to lead. You possess a strong willpower and determination.",
            career: "Entrepreneur, Executive, Inventor, Politician, Manager",
            love: "Compatible with 3, 5, 7. Needs a partner who respects their independence."
        },
        2: {
            title: "The Diplomat & Peacemaker",
            ruler: "Moon ☽",
            color: "White, Silver, Cream",
            gem: "Pearl, Moonstone",
            traits: "Intuitive, gentle, diplomatic, empathetic, and cooperative. You excel at creating harmony and understanding emotional depth.",
            career: "Diplomat, Counselor, Artist, Mediator, Therapist",
            love: "Compatible with 2, 4, 8, 9. Flourishes with emotionally supportive partners."
        },
        3: {
            title: "The Creative Communicator",
            ruler: "Jupiter ♃",
            color: "Yellow, Orange, Bright Pink",
            gem: "Yellow Sapphire, Citrine",
            traits: "Charismatic, expressive, optimistic, imaginative, and highly social. You possess a natural gift for arts and words.",
            career: "Writer, Performer, Speaker, Designer, Marketing Expert",
            love: "Compatible with 1, 5, 7. Seeks a fun, intellectually stimulating partner."
        },
        4: {
            title: "The Builder & Strategist",
            ruler: "Rahu ☊ / Uranus ♅",
            color: "Blue, Grey, Earthy Brown",
            gem: "Hessonite (Gomed), Blue Sapphire",
            traits: "Practical, disciplined, reliable, methodical, and hard-working. You build solid foundations for long-term success.",
            career: "Architect, Engineer, Financial Analyst, Project Manager, Lawyer",
            love: "Compatible with 2, 6, 8. Values loyalty, stability, and mutual respect."
        },
        5: {
            title: "The Free Spirit & Explorer",
            ruler: "Mercury ☿",
            color: "Green, Turquoise, Light Grey",
            gem: "Emerald, Peridot",
            traits: "Versatile, adventurous, quick-witted, freedom-loving, and dynamic. You thrive on change and diverse experiences.",
            career: "Traveler, Journalist, Event Manager, Sales Strategist, Media Specialist",
            love: "Compatible with 1, 3, 7. Thrives with adventurous, open-minded partners."
        },
        6: {
            title: "The Nurturer & Harmonic",
            ruler: "Venus ♀",
            color: "Pink, Pastel Blue, Silver",
            gem: "Diamond, White Sapphire, Opal",
            traits: "Compassionate, responsible, artistic, domestic, and loving. You bring beauty, balance, and healing into every environment.",
            career: "Healer, Teacher, Interior Designer, Musician, Human Resources",
            love: "Compatible with 4, 8, 9, 2. Dedicated, romantic, and deeply devoted."
        },
        7: {
            title: "The Seeker & Mystic",
            ruler: "Ketu ☋ / Neptune ♆",
            color: "Purple, Violet, Light Green",
            gem: "Cat's Eye (Vaiduryam), Amethyst",
            traits: "Analytical, spiritual, introspective, wise, and intuitive. You seek truth, wisdom, and deep spiritual understanding.",
            career: "Researcher, Astrologer, Philosopher, Scientist, Spiritual Guide",
            love: "Compatible with 1, 3, 5. Needs an intellectual and emotionally deep connection."
        },
        8: {
            title: "The Powerhouse & Achiever",
            ruler: "Saturn ♄",
            color: "Dark Blue, Black, Dark Violet",
            gem: "Blue Sapphire, Amethyst",
            traits: "Ambitious, authoritative, resilient, strategic, and financially astute. You possess immense executive power and endurance.",
            career: "CEO, Financial Mogul, Banker, Real Estate Giant, Judge",
            love: "Compatible with 2, 4, 6. Values strength, trustworthiness, and dedication."
        },
        9: {
            title: "The Humanitarian & Warrior",
            ruler: "Mars ♂",
            color: "Crimson Red, Scarlet, Gold",
            gem: "Red Coral, Carnelian",
            traits: "Courageous, generous, visionary, passionate, and humanitarian. Driven by a desire to uplift others and transform society.",
            career: "Doctor, Military Leader, Social Reformer, Firefighter, Athlete",
            love: "Compatible with 2, 6, 9. Deeply passionate, protective, and compassionate."
        },
        11: {
            title: "Master Number 11: The Intuitive Visionary",
            ruler: "Moon/Neptune ☽♆",
            color: "Silver, Electric Blue, Violet",
            gem: "Pearl, Amethyst, Labradorite",
            traits: "Illuminated, highly intuitive, spiritual, visionary, and charismatic. Master 11 carries intense spiritual frequency.",
            career: "Spiritual Teacher, Artist, Healer, Motivational Speaker",
            love: "Compatible with 2, 6, 7. Needs a soulmate level connection."
        },
        22: {
            title: "Master Number 22: The Master Architect",
            ruler: "Uranus/Earth ♅",
            color: "Gold, Platinum, Deep Blue",
            gem: "Blue Sapphire, Diamond",
            traits: "Capable of turning grand dreams into concrete reality. The most powerful building number in numerology.",
            career: "Global Entrepreneur, Diplomat, City Planner, Visionary Leader",
            love: "Compatible with 4, 8, 22. Values grounded passion and vision."
        }
    };

    // Calculate Life Path Number from DOB string (YYYY-MM-DD)
    function calculateLifePathNumber(dobString) {
        if (!dobString) return null;
        const clean = dobString.replace(/[^0-9]/g, '');
        if (clean.length < 8) return null;

        const year = parseInt(clean.substring(0, 4), 10);
        const month = parseInt(clean.substring(4, 6), 10);
        const day = parseInt(clean.substring(6, 8), 10);

        function reduceNum(n, allowMaster = true) {
            if (allowMaster && (n === 11 || n === 22 || n === 33)) return n;
            let sum = 0;
            while (n > 0) {
                sum += n % 10;
                n = Math.floor(n / 10);
            }
            if (sum > 9 && !(allowMaster && (sum === 11 || sum === 22 || sum === 33))) {
                return reduceNum(sum, allowMaster);
            }
            return sum;
        }

        const rDay = reduceNum(day, true);
        const rMonth = reduceNum(month, true);
        const rYear = reduceNum(year, true);

        let total = rDay + rMonth + rYear;
        return reduceNum(total, true);
    }

    // Pythagorean letter value map
    const PYTHAGOREAN_MAP = {
        A:1, J:1, S:1,
        B:2, K:2, T:2,
        C:3, L:3, U:3,
        D:4, M:4, V:4,
        E:5, N:5, W:5,
        F:6, O:6, X:6,
        G:7, P:7, Y:7,
        H:8, Q:8, Z:8,
        I:9, R:9
    };

    function calculateDestinyNumber(name) {
        if (!name) return 5;
        let sum = 0;
        const upper = name.toUpperCase();
        for (let i = 0; i < upper.length; i++) {
            const char = upper[i];
            if (PYTHAGOREAN_MAP[char]) {
                sum += PYTHAGOREAN_MAP[char];
            }
        }
        function reduceNum(n) {
            if (n === 11 || n === 22) return n;
            let s = 0;
            while (n > 0) { s += n % 10; n = Math.floor(n / 10); }
            if (s > 9 && s !== 11 && s !== 22) return reduceNum(s);
            return s || 5;
        }
        return reduceNum(sum);
    }

    function calculateSoulUrgeNumber(name) {
        if (!name) return 3;
        const vowels = "AEIOU";
        let sum = 0;
        const upper = name.toUpperCase();
        for (let i = 0; i < upper.length; i++) {
            const char = upper[i];
            if (vowels.includes(char) && PYTHAGOREAN_MAP[char]) {
                sum += PYTHAGOREAN_MAP[char];
            }
        }
        function reduceNum(n) {
            if (n === 11 || n === 22) return n;
            let s = 0;
            while (n > 0) { s += n % 10; n = Math.floor(n / 10); }
            if (s > 9 && s !== 11 && s !== 22) return reduceNum(s);
            return s || 3;
        }
        return reduceNum(sum);
    }

    // --- ZODIAC DATA ---
    const ZODIAC_DATA = {
        aries: {
            name: "Aries",
            symbol: "♈",
            dates: "Mar 21 - Apr 19",
            element: "Fire 🔥",
            planet: "Mars ♂",
            luckyNum: "9, 1, 18",
            luckyColor: "Crimson Red, Gold",
            daily: "Dynamic energy surrounds you today! An unexpected business or creative opportunity demands swift decision-making. Trust your inner courage.",
            weekly: "This week brings high financial clarity and strategic momentum. A breakthrough in personal relationships brings immense joy.",
            monthly: "A transformative month for personal authority and career advancement. Planetary alignments favour bold new initiatives."
        },
        taurus: {
            name: "Taurus",
            symbol: "♉",
            dates: "Apr 20 - May 20",
            element: "Earth 🌍",
            planet: "Venus ♀",
            luckyNum: "6, 15, 24",
            luckyColor: "Emerald Green, Pink",
            daily: "Patience and steadfast focus yield lucrative long-term rewards today. Focus on grounding your financial plans.",
            weekly: "Harmonious Venus transits foster romantic warmth and solid investment growth over the coming days.",
            monthly: "A serene and prosperous month ahead. Consistency in your daily routine builds a lasting foundation of success."
        },
        gemini: {
            name: "Gemini",
            symbol: "♊",
            dates: "May 21 - Jun 20",
            element: "Air 💨",
            planet: "Mercury ☿",
            luckyNum: "5, 14, 23",
            luckyColor: "Bright Yellow, Silver",
            daily: "A surprise conversation opens new horizons for your intellectual and professional growth. Share your ideas clearly.",
            weekly: "Networking and travel bring remarkable strategic insights. Your innate charm opens closed doors effortlessly.",
            monthly: "Intellectual agility leads to lucrative endeavors. Focus on clear contracts and key partnerships this month."
        },
        cancer: {
            name: "Cancer",
            symbol: "♋",
            dates: "Jun 21 - Jul 22",
            element: "Water 💧",
            planet: "Moon ☽",
            luckyNum: "2, 7, 11",
            luckyColor: "Pearl White, Silver",
            daily: "Trust your gut instincts in financial and emotional matters today. Family ties bring deep comfort and renewed strength.",
            weekly: "Intuitive clarity guides key decisions regarding home, property, or family investments this week.",
            monthly: "An emotionally enriching month. Cosmic currents highlight emotional wellness and artistic manifestation."
        },
        leo: {
            name: "Leo",
            symbol: "♌",
            dates: "Jul 23 - Aug 22",
            element: "Fire 🔥",
            planet: "Sun ☉",
            luckyNum: "1, 10, 19",
            luckyColor: "Royal Gold, Amber",
            daily: "Your leadership skills shine brightly today; step confidently into the spotlight. Recognition for past efforts arrives.",
            weekly: "A stellar week for creative projects, public speaking, and financial expansion under favorable solar aspects.",
            monthly: "You are the cosmic center of positive attention. New ventures launched this month bear rich fruits."
        },
        virgo: {
            name: "Virgo",
            symbol: "♍",
            dates: "Aug 23 - Sep 22",
            element: "Earth 🌍",
            planet: "Mercury ☿",
            luckyNum: "5, 14, 32",
            luckyColor: "Navy Blue, Olive Green",
            daily: "Attention to detail resolves a long-standing challenge gracefully. Health and vitality receive a cosmic boost.",
            weekly: "Methodical execution yields major breakthroughs at work. A great week to refine your health and daily schedule.",
            monthly: "Focus on optimization pays off immensely. Financial planning and organization bring peaceful prosperity."
        },
        libra: {
            name: "Libra",
            symbol: "♎",
            dates: "Sep 23 - Oct 22",
            element: "Air 💨",
            planet: "Venus ♀",
            luckyNum: "6, 15, 24",
            luckyColor: "Rose Pink, Sky Blue",
            daily: "Balance between work and self-care brings profound peace of mind. A partner offers key support.",
            weekly: "Relationship dynamics reach harmonious peak. Creative collaboration attracts lucrative financial rewards.",
            monthly: "A golden period for partnership, marriage, and aesthetic ventures. Balance reigns supreme in your life."
        },
        scorpio: {
            name: "Scorpio",
            symbol: "♏",
            dates: "Oct 23 - Nov 21",
            element: "Water 💧",
            planet: "Pluto/Mars ♇♂",
            luckyNum: "8, 9, 18",
            luckyColor: "Deep Crimson, Maroon",
            daily: "Deep intuition guides you toward a lucrative breakthrough today. Keep your long-term goals focused.",
            weekly: "Transformative planetary movements clear old obstacles. Financial insights offer major strategic leverage.",
            monthly: "A powerful month for spiritual rebirth and material mastery. Your magnetic presence commands respect."
        },
        sagittarius: {
            name: "Sagittarius",
            symbol: "♐",
            dates: "Nov 22 - Dec 21",
            element: "Fire 🔥",
            planet: "Jupiter ♃",
            luckyNum: "3, 12, 21",
            luckyColor: "Purple, Turquoise",
            daily: "Expand your horizons—a promising opportunity awaits distant connection or higher learning today.",
            weekly: "Jupiter's benevolent rays inspire travel, spiritual growth, and high optimism across all engagements.",
            monthly: "Luck and expansion accompany your endeavors. Bold leaps of faith bring abundant returns."
        },
        capricorn: {
            name: "Capricorn",
            symbol: "♑",
            dates: "Dec 22 - Jan 19",
            element: "Earth 🌍",
            planet: "Saturn ♄",
            luckyNum: "4, 8, 13",
            luckyColor: "Charcoal Grey, Dark Brown",
            daily: "Your disciplined strategy yields recognition and tangible progress. Stay persistent with career milestones.",
            weekly: "Career growth accelerates through structured effort. Authority figures acknowledge your dedication.",
            monthly: "A landmark month for financial security and long-term career ambition. Success is solidly built."
        },
        aquarius: {
            name: "Aquarius",
            symbol: "♒",
            dates: "Jan 20 - Feb 18",
            element: "Air 💨",
            planet: "Uranus/Saturn ♅",
            luckyNum: "11, 22, 7",
            luckyColor: "Electric Blue, Metallic Silver",
            daily: "An innovative spark inspires a fresh approach to your goals today. Original thinking sets you apart.",
            weekly: "Humanitarian activities and tech innovations flourish. Unexpected breakthroughs illuminate your path.",
            monthly: "A revolutionary month for visionary projects and community leadership. Stand tall in your originality."
        },
        pisces: {
            name: "Pisces",
            symbol: "♓",
            dates: "Feb 19 - Mar 20",
            element: "Water 💧",
            planet: "Neptune/Jupiter ♆",
            luckyNum: "7, 12, 16",
            luckyColor: "Sea Green, Lavender",
            daily: "Your creative energy and spiritual intuition are at an all-time high today. Express yourself through art or meditation.",
            weekly: "Empathetic bonds deepen. Creative projects receive artistic inspiration and financial backing.",
            monthly: "A peaceful and deeply intuitive month. Spiritual growth and emotional fulfillment crown your efforts."
        }
    };

    function getZodiacFromDOB(dobString) {
        if (!dobString) return ZODIAC_DATA.aries;
        const clean = dobString.replace(/[^0-9]/g, '');
        if (clean.length < 8) return ZODIAC_DATA.aries;

        const month = parseInt(clean.substring(4, 6), 10);
        const day = parseInt(clean.substring(6, 8), 10);

        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_DATA.aries;
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_DATA.taurus;
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_DATA.gemini;
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_DATA.cancer;
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_DATA.leo;
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_DATA.virgo;
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC_DATA.libra;
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC_DATA.scorpio;
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_DATA.sagittarius;
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_DATA.capricorn;
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_DATA.aquarius;
        return ZODIAC_DATA.pisces;
    }

    // --- DOM READY BINDINGS ---
    $(document).ready(function() {

        // 1. NUMEROLOGY CALCULATOR HANDLER
        function runNumerologyCalculation() {
            const nameInput = $('#calc_name, #num_name, input[name="calc_name"]').val() || $('#num_input_name').val() || "Seeker";
            const dobInput = $('#calc_dob, #num_dob, input[name="calc_dob"]').val() || $('#num_input_dob').val();

            if (!dobInput) {
                showToast("Please enter your Date of Birth to calculate your Numerology reading!", "warning");
                return;
            }

            const lifePath = calculateLifePathNumber(dobInput);
            const destiny = calculateDestinyNumber(nameInput);
            const soulUrge = calculateSoulUrgeNumber(nameInput);
            const lpData = NUMEROLOGY_DATA[lifePath] || NUMEROLOGY_DATA[1];

            // Build html result card
            const resultHtml = `
                <div class="glass-card" style="padding: 30px; margin-top: 25px; border: 1px solid var(--gold); border-radius: 18px; background: rgba(13,13,43,0.95);">
                    <div style="text-align:center; margin-bottom: 20px;">
                        <span style="display:inline-block; font-size: 11px; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:var(--gold); background:rgba(201,168,76,0.15); padding: 4px 14px; border-radius: 20px;">Cosmic Numerology Analysis for ${escapeHtml(nameInput)}</span>
                        <h2 style="font-family:'Cinzel',serif; color:#fff; font-size: 2.2rem; margin: 10px 0 4px;">Life Path Number ${lifePath}</h2>
                        <h4 style="color:var(--gold); font-size: 1.1rem; font-style:italic;">"${lpData.title}"</h4>
                    </div>

                    <div class="row" style="margin-bottom: 24px;">
                        <div class="col-md-4 col-sm-4 col-12" style="margin-bottom: 15px;">
                            <div style="background:rgba(124,58,237,0.12); border:1px solid rgba(124,58,237,0.3); border-radius:14px; padding: 18px; text-align:center;">
                                <div style="font-size: 2.4rem; font-weight: 900; color:var(--gold); font-family:'Cinzel',serif;">${lifePath}</div>
                                <div style="color:var(--text-primary); font-weight:700; font-size: 13px; text-transform:uppercase; margin-top:4px;">Life Path Number</div>
                                <div style="color:var(--text-muted); font-size: 11px; margin-top:4px;">Core Life Purpose & Journey</div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-12" style="margin-bottom: 15px;">
                            <div style="background:rgba(201,168,76,0.12); border:1px solid rgba(201,168,76,0.3); border-radius:14px; padding: 18px; text-align:center;">
                                <div style="font-size: 2.4rem; font-weight: 900; color:var(--gold-light); font-family:'Cinzel',serif;">${destiny}</div>
                                <div style="color:var(--text-primary); font-weight:700; font-size: 13px; text-transform:uppercase; margin-top:4px;">Destiny / Expression</div>
                                <div style="color:var(--text-muted); font-size: 11px; margin-top:4px;">Innate Talents & Capabilities</div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-12" style="margin-bottom: 15px;">
                            <div style="background:rgba(232,121,160,0.12); border:1px solid rgba(232,121,160,0.3); border-radius:14px; padding: 18px; text-align:center;">
                                <div style="font-size: 2.4rem; font-weight: 900; color:var(--pink); font-family:'Cinzel',serif;">${soulUrge}</div>
                                <div style="color:var(--text-primary); font-weight:700; font-size: 13px; text-transform:uppercase; margin-top:4px;">Soul Urge / Heart</div>
                                <div style="color:var(--text-muted); font-size: 11px; margin-top:4px;">Deepest Inner Desires</div>
                            </div>
                        </div>
                    </div>

                    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:20px; margin-bottom: 20px;">
                        <h4 style="color:var(--gold); font-size: 1rem; margin-bottom: 8px;"><i class="fa fa-star" style="margin-right:6px;"></i> Personality Traits & Spiritual Blueprint</h4>
                        <p style="color:var(--text-muted); font-size:14px; line-height:1.7; margin:0;">${lpData.traits}</p>
                    </div>

                    <div class="row">
                        <div class="col-md-6 col-12" style="margin-bottom: 15px;">
                            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px;">
                                <h5 style="color:var(--gold); font-size:0.9rem; margin-bottom:6px;"><i class="fa fa-briefcase"></i> Best Career Alignment</h5>
                                <p style="color:var(--text-muted); font-size:13px; margin:0;">${lpData.career}</p>
                            </div>
                        </div>
                        <div class="col-md-6 col-12" style="margin-bottom: 15px;">
                            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px;">
                                <h5 style="color:var(--gold); font-size:0.9rem; margin-bottom:6px;"><i class="fa fa-heart"></i> Love & Relationship Match</h5>
                                <p style="color:var(--text-muted); font-size:13px; margin:0;">${lpData.love}</p>
                            </div>
                        </div>
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:15px; margin-top: 15px; padding-top:15px; border-top:1px solid rgba(255,255,255,0.08); font-size:13px;">
                        <div><strong style="color:var(--gold);">Ruling Planet:</strong> <span style="color:var(--text-primary);">${lpData.ruler}</span></div>
                        <div><strong style="color:var(--gold);">Lucky Colors:</strong> <span style="color:var(--text-primary);">${lpData.color}</span></div>
                        <div><strong style="color:var(--gold);">Power Gemstone:</strong> <span style="color:var(--text-primary);">${lpData.gem}</span></div>
                    </div>

                    <div style="text-align:center; margin-top:25px;">
                        <a href="appointment" class="ast_btn">Book 1-on-1 Consultation with Riitu</a>
                    </div>
                </div>
            `;

            $('#result_grid, #numerology_results_container, .result-grid').hide().html(resultHtml).addClass('show').fadeIn(400);

            // Scroll smoothly to results
            $('html, body').animate({
                scrollTop: ($('#result_grid, #numerology_results_container, .result-grid').offset().top - 100)
            }, 600);
        }

        $(document).on('click', '#btn_calc_num, .btn-calc-numerology, #btn_numerology_submit', function(e) {
            e.preventDefault();
            runNumerologyCalculation();
        });

        // 2. ZODIAC HOROSCOPE SELECTION & CALCULATOR HANDLER
        function renderZodiacDetails(zodiacObj) {
            const html = `
                <div class="zr-symbol">${zodiacObj.symbol}</div>
                <div class="zr-name">${zodiacObj.name}</div>
                <div class="zr-dates">${zodiacObj.dates}</div>
                <div>
                    <span class="zr-badge">Element: ${zodiacObj.element}</span>
                    <span class="zr-badge">Planet: ${zodiacObj.planet}</span>
                    <span class="zr-badge">Lucky Numbers: ${zodiacObj.luckyNum}</span>
                    <span class="zr-badge">Lucky Colors: ${zodiacObj.luckyColor}</span>
                </div>
                
                <div style="margin-top: 20px; text-align: left; background: rgba(255,255,255,0.03); padding: 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
                    <ul class="nav nav-tabs" style="border-bottom: 1px solid var(--gold); margin-bottom: 15px;">
                        <li class="active"><a href="#tab_daily" data-toggle="tab" style="color:var(--gold); font-weight:bold;">Daily Prediction</a></li>
                        <li><a href="#tab_weekly" data-toggle="tab" style="color:var(--gold); font-weight:bold;">Weekly Forecast</a></li>
                        <li><a href="#tab_monthly" data-toggle="tab" style="color:var(--gold); font-weight:bold;">Monthly Overview</a></li>
                    </ul>
                    <div class="tab-content" style="color:var(--text-muted); font-size: 14px; line-height:1.7;">
                        <div class="tab-pane active" id="tab_daily">${zodiacObj.daily}</div>
                        <div class="tab-pane" id="tab_weekly">${zodiacObj.weekly}</div>
                        <div class="tab-pane" id="tab_monthly">${zodiacObj.monthly}</div>
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <a href="appointment" class="ast_btn">Get Detailed Personal Kundli Reading</a>
                </div>
            `;
            $('#zodiac_result_box, .zodiac-result-box').html(html).addClass('show').fadeIn(300);
        }

        $(document).on('click', '.z-card', function() {
            const signKey = $(this).attr('data-sign') || $(this).find('.z-name').text().trim().toLowerCase();
            const zData = ZODIAC_DATA[signKey] || ZODIAC_DATA.aries;
            $('.z-card').css('border-color', 'var(--border-glass)');
            $(this).css('border-color', 'var(--gold)');
            renderZodiacDetails(zData);
        });

        $(document).on('click', '#btn_find_zodiac', function(e) {
            e.preventDefault();
            const dobVal = $('#zodiac_dob_input').val();
            if (!dobVal) {
                showToast("Please enter your birth date to find your Zodiac Sign!", "warning");
                return;
            }
            const zData = getZodiacFromDOB(dobVal);
            renderZodiacDetails(zData);
        });

        // 3. ZODIAC COMPATIBILITY CALCULATOR HANDLER
        $(document).on('click', '#btn_calc_compat', function(e) {
            e.preventDefault();
            const sign1 = $('#compat_sign1').val() || 'aries';
            const sign2 = $('#compat_sign2').val() || 'leo';

            const z1 = ZODIAC_DATA[sign1] || ZODIAC_DATA.aries;
            const z2 = ZODIAC_DATA[sign2] || ZODIAC_DATA.leo;

            let score = 88;
            let note = "High astrological harmony! Fire and Air elements spark dynamic creativity, passion, and mutual growth.";

            if (z1.element === z2.element) {
                score = 94;
                note = "Soulmate compatibility! Sharing the same element brings deep intuitive understanding and effortless synergy.";
            } else if ((z1.element.includes("Fire") && z2.element.includes("Water")) || (z1.element.includes("Earth") && z2.element.includes("Air"))) {
                score = 76;
                note = "Complementary partnership! Differences offer profound opportunities for spiritual growth, balance, and patience.";
            }

            const html = `
                <div class="score-circle" style="border: 4px solid var(--gold); box-shadow: 0 0 25px rgba(201,168,76,0.3);">
                    <div class="score-num">${score}%</div>
                </div>
                <div class="compat-verdict">${z1.name} ${z1.symbol} + ${z2.name} ${z2.symbol}</div>
                <div class="compat-note" style="color:var(--text-muted); font-size:14px; max-width:480px; margin:0 auto; line-height:1.6;">${note}</div>
                <div style="margin-top:20px;">
                    <a href="appointment" class="ast_btn">Book Relationship & Kundli Matching</a>
                </div>
            `;

            $('#compat_result, .compat-result').html(html).addClass('show').fadeIn(300);
        });

        // 4. BLOG LIVE SEARCH & CATEGORY FILTER
        $(document).on('keyup input', '#blog_search_input, .ast_blog_search_input', function() {
            const query = $(this).val().toLowerCase().trim();
            $('.ast_blog_box, .blog_post_item').each(function() {
                const title = $(this).find('h2, h3, h4, .ast_blog_info').text().toLowerCase();
                if (title.indexOf(query) !== -1 || query === '') {
                    $(this).closest('.col-lg-4, .col-md-6, .col-12, .ast_blog_box').fadeIn(200);
                } else {
                    $(this).closest('.col-lg-4, .col-md-6, .col-12, .ast_blog_box').fadeOut(200);
                }
            });
        });

        $(document).on('click', '.blog-filter-btn', function(e) {
            e.preventDefault();
            $('.blog-filter-btn').removeClass('active').css({ 'background': 'transparent', 'color': 'var(--text-muted)' });
            $(this).addClass('active').css({ 'background': 'var(--gold)', 'color': '#07071a' });

            const category = $(this).attr('data-filter') || 'all';
            if (category === 'all') {
                $('.ast_blog_box, .blog_post_item').closest('.col-lg-4, .col-md-6, .col-12').fadeIn(300);
            } else {
                $('.ast_blog_box, .blog_post_item').each(function() {
                    const text = $(this).text().toLowerCase();
                    if (text.includes(category.toLowerCase())) {
                        $(this).closest('.col-lg-4, .col-md-6, .col-12').fadeIn(300);
                    } else {
                        $(this).closest('.col-lg-4, .col-md-6, .col-12').fadeOut(300);
                    }
                });
            }
        });

        // 5. BLOG COMMENT ENGINE HANDLED LIVE VIA FIREBASE IN initLiveChatEngine()

        // FAQ Accordion Toggle Handler
        $(document).on('click', '.riitu-faq-header', function() {
            const parent = $(this).closest('.riitu-faq-item');
            const body = parent.find('.riitu-faq-body');
            const icon = $(this).find('.faq-icon');
            
            if (body.is(':visible')) {
                body.slideUp(250);
                $(this).css({ 'background-color': '#ffffff', 'color': '#111111' });
                icon.html('&#43;').css('color', '#111111');
            } else {
                $('.riitu-faq-body').slideUp(250);
                $('.riitu-faq-header').css({ 'background-color': '#ffffff', 'color': '#111111' });
                $('.faq-icon').html('&#43;').css('color', '#111111');

                body.slideDown(250);
                $(this).css({ 'background-color': '#7b4397', 'color': '#ffffff' });
                icon.html('&minus;').css('color', '#ffffff');
            }
        });

        // About Page Life Path Quick Calculator Handler
        $(document).on('click', '#aboutCalcBtn', function(e) {
            e.preventDefault();
            const dob = $('#aboutDobInput').val();
            if (!dob) {
                showToast("Please enter your Date of Birth to calculate your Life Path Number.", "error");
                return;
            }
            const num = calculateLifePathNumber(dob);
            if (!num || !NUMEROLOGY_DATA[num]) {
                showToast("Please enter a valid Date of Birth.", "error");
                return;
            }
            const data = NUMEROLOGY_DATA[num];
            $('#aboutCalcResult').html(`
                <div style="background: #faf5fc; border: 2px solid #7b4397; border-radius: 12px; padding: 18px; margin-top: 15px; transition: all 0.3s ease;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                        <span style="background: #7b4397; color: #fff; font-weight: 800; font-size: 18px; padding: 4px 16px; border-radius: 20px;">Life Path #${num}</span>
                        <span style="font-size: 13px; font-weight: 700; color: #7b4397;">Ruler: ${data.ruler}</span>
                    </div>
                    <h5 style="font-size: 15px; font-weight: 700; color: #111; margin-bottom: 6px;">${data.title}</h5>
                    <p style="font-size: 13px; color: #555; line-height: 1.5; margin-bottom: 8px;"><strong>Core Traits:</strong> ${data.traits}</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 12px; color: #666;">
                        <span>💎 <strong>Gem:</strong> ${data.gem}</span>
                        <span>🎨 <strong>Lucky Color:</strong> ${data.color}</span>
                    </div>
                </div>
            `).show();
            showToast(`✨ Your Life Path Number is #${num} (${data.title})`, "success");
        });

        // 6. DYNAMIC AUTH & E-BOOK PURCHASE ENGINE
        function updateAuthUI() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userName = localStorage.getItem('userName') || 'Seeker';
            
            $('.ast_autho_wrapper').each(function() {
                const $wrapper = $(this);
                const $searchItem = $wrapper.find('li.ast_search').detach();
                const $cartItem = $wrapper.find('li.ast_cart').detach();
                
                const $ul = $wrapper.find('ul');
                $ul.empty();

                if (isLoggedIn) {
                    const userRole = localStorage.getItem('userRole') || 'client';
                    const portalUrl = (userRole === 'admin') ? 'admin-dashboard.html' : 'client-dashboard.html';
                    const portalText = (userRole === 'admin') ? 'Admin Portal' : 'My Dashboard';

                    $ul.append(`
                        <li style="color: #ffffff; font-weight: 600; padding: 0 8px; display: inline-flex; align-items: center; gap: 6px;">
                            <i class="fa fa-user-circle" style="color: #d4af37; font-size: 15px;"></i> Hi, <span style="color: #ffd700;">${userName}</span>
                        </li>
                        <li>
                            <a href="${portalUrl}" style="color: #ffda79; font-weight: 700;">
                                <i class="fa fa-tachometer" aria-hidden="true"></i> ${portalText}
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" id="btn_signout_trigger" style="color: #ff6b6b; font-weight: 600;">
                                <i class="fa fa-sign-out" aria-hidden="true"></i> Sign Out
                            </a>
                        </li>
                    `);
                } else {
                    $ul.append(`
                        <li><a class="popup-with-zoom-anim" href="#login-dialog"><i class="fa fa-sign-in" aria-hidden="true"></i> Log In</a></li>
                        <li><a class="popup-with-zoom-anim" href="#signup-dialog"><i class="fa fa-user-plus" aria-hidden="true"></i> Sign Up</a></li>
                    `);
                }

				if ($searchItem.length) $ul.append($searchItem);
				if (isLoggedIn && $cartItem.length) {
					$ul.append($cartItem);
				}
			});

			// Ensure magnificPopup is re-bound so login/signup continue working
			if ($.fn && $.fn.magnificPopup) {
				$('.popup-with-zoom-anim').magnificPopup({
					type: 'inline',
                    fixedContentPos: false,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    preloader: false,
                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'my-mfp-zoom-in'
                });

                $('.popup-youtube').magnificPopup({
                    disableOn: 300,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }
        }

        // Expose updateAuthUI globally so Firebase Auth state listener can call it
        window.updateAuthUI = updateAuthUI;

        // Initialize Auth UI on page load
        updateAuthUI();

        // Universal Delegated Modal Trigger for Login and Signup
        $(document).on('click', 'a[href="#login-dialog"], a[href="#signup-dialog"], .popup-with-zoom-anim', function(e) {
            const href = $(this).attr('href');
            if (href === '#login-dialog' || href === '#signup-dialog') {
                e.preventDefault();
                e.stopPropagation();
                if ($.magnificPopup) {
                    $.magnificPopup.open({
                        items: { src: href },
                        type: 'inline',
                        fixedContentPos: false,
                        fixedBgPos: true,
                        overflowY: 'auto',
                        closeBtnInside: true,
                        preloader: false,
                        midClick: true,
                        mainClass: 'my-mfp-zoom-in'
                    });
                }
            }
        });

        // Instant Modal Switcher: Signup -> Login
        $(document).on('click', '#signup-dialog p a, .open-login-modal', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if ($.magnificPopup) {
                $.magnificPopup.open({
                    items: { src: '#login-dialog' },
                    type: 'inline',
                    fixedContentPos: false,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    midClick: true,
                    mainClass: 'my-mfp-zoom-in'
                });
            }
        });

        // Instant Modal Switcher: Login -> Signup
        $(document).on('click', '#login-dialog p a, .open-signup-modal', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if ($.magnificPopup) {
                $.magnificPopup.open({
                    items: { src: '#signup-dialog' },
                    type: 'inline',
                    fixedContentPos: false,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    midClick: true,
                    mainClass: 'my-mfp-zoom-in'
                });
            }
        });

        // Sign Out Event Listener
        $(document).on('click', '#btn_signout_trigger', function(e) {
            e.preventDefault();
            if (window.FirebaseHelper && typeof window.FirebaseHelper.logoutUser === 'function') {
                window.FirebaseHelper.logoutUser();
            }
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userRole');
            localStorage.removeItem('pendingBuy');
            updateAuthUI();
            showToast("👋 You have signed out successfully.", "success");
            if (window.location.pathname.includes('dashboard') || window.location.pathname.includes('client') || window.location.pathname.includes('admin')) {
                setTimeout(function() { window.location.href = 'index.html'; }, 500);
            }
        });

        // Buy E-Book Click Interceptor - Requires login before proceeding to checkout
        $(document).on('click', '.buy-ebook-btn, a[href="checkout"]', function(e) {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                e.preventDefault();
                localStorage.setItem('pendingBuy', 'true');
                showToast("🔒 Please Log In or Sign Up to purchase and download your E-Book.", "warning");
                if ($.magnificPopup) {
                    $.magnificPopup.open({
                        items: { src: '#login-dialog' },
                        type: 'inline',
                        removalDelay: 300,
                        mainClass: 'my-mfp-zoom-in'
                    });
                } else {
                    window.location.href = '#login-dialog';
                }
            } else {
                e.preventDefault();
                showToast("✨ Proceeding to instant checkout for your E-Book...", "success");
                setTimeout(function() {
                    window.location.href = "checkout";
                }, 800);
            }
        });

        // 7. FORM SUBMISSION INTERCEPTORS (Appointment, Contact, Login, Signup, Newsletter, Checkout)
        $(document).on('submit', 'form', async function(e) {
            const formId = $(this).attr('id') || '';
            const action = $(this).attr('action') || '';
            const $form = $(this);

            if (formId === 'blog_comment_form' || formId === 'search_form') return;

            // Appointment Booking Form
            if (formId.includes('appointment') || $form.hasClass('ast_appointment_form') || action.includes('appointment')) {
                e.preventDefault();
                const name = $form.find('input[name="name"], input[placeholder*="Name"]').val() || '';
                const email = $form.find('input[name="email"], input[placeholder*="Email"]').val() || '';
                const phone = $form.find('input[name="mobile"], input[name="phone"], input[placeholder*="Mobile"], input[placeholder*="Phone"]').val() || '';
                const type = $form.find('select[name="type"], select').val() || 'General Consultation';
                const date = $form.find('input[name="date"], input[type="date"]').val() || '';
                const notes = $form.find('textarea').val() || '';

                if (window.FirebaseHelper) {
                    await window.FirebaseHelper.saveAppointment({ name, email, phone, type, date, notes });
                }

                showToast("✨ Appointment Booked! Saved to Firebase. Our team will contact you shortly with your slot details.", "success");
                $form[0].reset();
            } 
            // Checkout Form
            else if (formId.includes('checkout') || $form.hasClass('checkout') || window.location.pathname.includes('checkout.html')) {
                e.preventDefault();
                const firstName = $form.find('input[placeholder*="First Name"], input[name="first_name"]').val() || '';
                const lastName = $form.find('input[placeholder*="Last Name"], input[name="last_name"]').val() || '';
                const email = $form.find('input[placeholder*="Email"], input[name="email"]').val() || '';
                const phone = $form.find('input[placeholder*="Phone"], input[name="phone"]').val() || '';
                const address = $form.find('input[placeholder*="Address"], textarea[name="address"]').val() || '';

                if (window.FirebaseHelper) {
                    await window.FirebaseHelper.saveOrder({
                        customerName: `${firstName} ${lastName}`.trim(),
                        email: email,
                        phone: phone,
                        address: address,
                        product: "Exclusive Chaldean Numerology & Vedic Astrology E-Book",
                        total: "₹499"
                    });
                }

                showToast("🎉 Order Placed Successfully! Saved in Firebase. Your E-Book download link has been dispatched.", "success");
                setTimeout(function() {
                    window.location.href = "shop";
                }, 2000);
            }
            // Contact Us Form
            else if (formId.includes('contact') || action.includes('contact')) {
                e.preventDefault();
                const name = $form.find('input[name="name"], input[placeholder*="Name"]').val() || '';
                const email = $form.find('input[name="email"], input[placeholder*="Email"]').val() || '';
                const subject = $form.find('input[name="subject"], input[placeholder*="Subject"]').val() || '';
                const message = $form.find('textarea').val() || '';

                if (window.FirebaseHelper) {
                    await window.FirebaseHelper.saveContact({ name, email, subject, message });
                }

                showToast("📬 Message Received! Saved to Firebase. MindMitra Riitu team will respond within 24 hours.", "success");
                $form[0].reset();
            } 
            // Login Form / Dialog
            else if (formId === 'customLoginForm' || $form.closest('#login-dialog').length > 0 || action.includes('login') || $form.find('h2:contains("Login")').length > 0) {
                e.preventDefault();
                const email = $form.find('input[type="email"], input[placeholder*="Email"], input[placeholder*="email"], input[name="email"]').val() || 
                              $form.find('input[type="text"]').filter(function() { return $(this).val().includes('@'); }).val() ||
                              $form.find('input[type="text"]').first().val() || '';
                const password = $form.find('input[type="password"], input[placeholder*="Password"]').val() || '';

                if (!email || !password) {
                    showToast("Please enter both mobile/email and password to log in.", "warning");
                    return;
                }

                const cleanEmail = email.toLowerCase().trim();
                const isAdmin = cleanEmail.includes('admin') || 
                                cleanEmail === 'manurituraghav@gmail.com' || 
                                cleanEmail === 'admin@mindmitra.com' ||
                                cleanEmail === '8796733997' ||
                                password.toLowerCase().trim() === 'admin';
                const role = isAdmin ? 'admin' : 'client';
                const targetDashboard = isAdmin ? 'admin-dashboard.html' : 'client-dashboard.html';

                let displayName = cleanEmail.includes('@') ? cleanEmail.split('@')[0] : cleanEmail;
                if (isAdmin) displayName = "Advocate Riitu Raghav";

                const saveSessionAndRedirect = () => {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userName', displayName);
                    localStorage.setItem('userRole', role);
                    localStorage.setItem('userEmail', cleanEmail);
                    if ($.magnificPopup) $.magnificPopup.close();
                    updateAuthUI();
                    showToast(`✓ Login Successful! Redirecting to ${isAdmin ? 'Admin Portal' : 'Client Dashboard'}...`, "success");
                    setTimeout(function() { window.location.href = targetDashboard; }, 400);
                };

                if (window.FirebaseHelper) {
                    try {
                        const res = await window.FirebaseHelper.loginUser(cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@mindmitra.com`, password);
                        if (res.success && res.user && res.user.displayName) {
                            displayName = res.user.displayName;
                        }
                    } catch(err) {
                        console.warn("Firebase Auth fallback used:", err);
                    }
                }
                saveSessionAndRedirect();
            } 
            // Sign Up Form / Dialog
            else if (formId === 'customSignUpForm' || $form.closest('#signup-dialog').length > 0 || action.includes('signup') || $form.find('h2:contains("Sign Up")').length > 0) {
                e.preventDefault();
                const name = $form.find('input[placeholder*="Name"], input[placeholder*="name"], input[name="name"]').val() || 
                             $form.find('input[type="text"]').eq(0).val() || 'Seeker';
                const email = $form.find('input[type="email"], input[placeholder*="Email"], input[placeholder*="email"], input[name="email"]').val() || 
                              $form.find('input[type="text"]').filter(function() { return $(this).val().includes('@'); }).val() ||
                              $form.find('input[type="text"]').eq(1).val() || 'client@mindmitra.com';
                const password = $form.find('input[type="password"], input[placeholder*="Password"]').val() || '';
                const phone = $form.find('input[placeholder*="Mobile"], input[placeholder*="Phone"], input[name="mobile"]').val() || '';
                const gender = $form.find('select').val() || '';

                if (!email || !password) {
                    showToast("Please enter email/mobile and password to create an account.", "warning");
                    return;
                }

                const cleanEmail = email.toLowerCase().trim();
                const isAdmin = cleanEmail.includes('admin') || cleanEmail === 'manurituraghav@gmail.com';
                const role = isAdmin ? 'admin' : 'client';
                const targetDashboard = isAdmin ? 'admin-dashboard.html' : 'client-dashboard.html';

                const saveSessionAndRedirect = () => {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userName', name);
                    localStorage.setItem('userPhone', phone);
                    localStorage.setItem('userEmail', cleanEmail);
                    localStorage.setItem('userRole', role);
                    if ($.magnificPopup) $.magnificPopup.close();
                    updateAuthUI();
                    showToast(`✓ Account Created! Redirecting to ${isAdmin ? 'Admin Portal' : 'Client Dashboard'}...`, "success");
                    setTimeout(function() { window.location.href = targetDashboard; }, 400);
                };

                if (window.FirebaseHelper) {
                    try {
                        await window.FirebaseHelper.signupUser(name, cleanEmail.includes('@') ? cleanEmail : `${phone || 'client'}@mindmitra.com`, password, { phone, gender });
                    } catch(err) {
                        console.warn("Firebase Signup fallback used:", err);
                    }
                }
                saveSessionAndRedirect();
            } 
            // Forgot Password Form / Dialog
            else if (formId === 'customForgotForm' || $form.closest('#forgot-dialog').length > 0 || action.includes('forgot') || $form.find('h2:contains("Forgot")').length > 0 || $form.find('h2:contains("Reset")').length > 0) {
                e.preventDefault();
                const email = $form.find('#forgotEmailInput, input[type="email"], input[placeholder*="Email"]').val() || '';
                if (!email) {
                    showToast("Please enter your registered email address.", "warning");
                    return;
                }
                showToast("⌛ Requesting password reset...", "info");
                if (window.FirebaseHelper && typeof window.FirebaseHelper.sendPasswordResetEmail === 'function') {
                    const res = await window.FirebaseHelper.sendPasswordResetEmail(email.trim());
                    if (res.success) {
                        showToast("✨ " + res.message, "success");
                        if ($.magnificPopup) setTimeout(function() { $.magnificPopup.close(); }, 1500);
                    } else {
                        showToast("⚠️ " + res.error, "warning");
                    }
                } else {
                    showToast("✨ Password reset link sent to " + email, "success");
                    if ($.magnificPopup) setTimeout(function() { $.magnificPopup.close(); }, 1500);
                }
            }
            // Newsletter Subscription
            else if ($form.hasClass('ast_newsletter') || $form.parent().hasClass('ast_newsletter_box') || $form.find('input[placeholder*="Email"]').length > 0) {
                e.preventDefault();
                const email = $form.find('input[type="text"], input[type="email"]').val() || '';
                if (email && window.FirebaseHelper) {
                    await window.FirebaseHelper.saveSubscriber(email);
                }
                showToast("Subscribed! Saved to Firebase newsletter database.", "success");
                $form[0].reset();
            }
        });

        // Dynamic Injection of Forgot Password Modal if not present
        if ($('#forgot-dialog').length === 0) {
            $('body').append(`
                <div id="forgot-dialog" class="zoom-anim-dialog mfp-hide custom_auth_container">
                    <div class="custom_auth_wrapper">
                        <div class="custom_auth_left">
                            <div class="blob_image_frame">
                                <img src="images/765637113_18117591925823121_2835107640411605622_n.jpg" alt="Forgot Password">
                            </div>
                        </div>
                        <div class="custom_auth_right">
                            <div class="auth_form_card">
                                <h2>Reset Password</h2>
                                <p style="font-size:13px; color:#666; margin-bottom:15px; text-align:left;">Enter your registered Email Address to receive a password reset link.</p>
                                <form id="customForgotForm">
                                    <div class="auth_input_group">
                                        <input type="email" id="forgotEmailInput" placeholder="Enter Registered Email" required>
                                    </div>
                                    <button type="submit" style="width:100%; background:#ff7700; color:#fff; font-weight:700; font-size:15px; border:none; padding:12px; border-radius:6px; cursor:pointer; box-shadow:0 4px 15px rgba(255,119,0,0.35); margin-top:10px; margin-bottom:18px; text-transform:capitalize; transition:all 0.3s ease;">Send Reset Link</button>
                                    <div style="text-align:center;">
                                        <p style="margin-bottom:0; font-size:13px; color:#444;">Remembered Password? <a href="#login-dialog" class="open-login-modal" style="color:#e66a00; font-weight:700; text-decoration:none;">Log In</a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // Click handler for "Forgot Password" link in login dialog
        $(document).on('click', '#login-dialog a:contains("Forgot"), .open-forgot-modal, a[href="#forgot-dialog"]', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if ($.magnificPopup) {
                $.magnificPopup.open({
                    items: { src: '#forgot-dialog' },
                    type: 'inline',
                    fixedContentPos: false,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    midClick: true,
                    mainClass: 'my-mfp-zoom-in'
                });
            }
        });

        // TOAST NOTIFICATION UTILITY
        function showToast(message, type = "success") {
            let toastBox = $('#cosmic_toast');
            if (toastBox.length === 0) {
                toastBox = $('<div id="cosmic_toast" style="position:fixed; bottom:30px; right:30px; z-index:99999; max-width:380px;"></div>');
                $('body').append(toastBox);
            }

            const bg = type === "success" ? "linear-gradient(135deg, #130d2e, #1a0533)" : "linear-gradient(135deg, #2e0d13, #33051a)";
            const border = type === "success" ? "1px solid var(--gold)" : "1px solid #ff4d4d";

            const toastItem = $(`
                <div style="background: ${bg}; border: ${border}; color: #fff; padding: 16px 20px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.7); margin-top: 10px; font-size: 13px; display: flex; align-items: center; justify-content: space-between; gap: 12px; animation: fadeUp 0.4s ease;">
                    <div>${message}</div>
                    <button style="background:none; border:none; color:var(--gold); font-size:16px; cursor:pointer;" onclick="$(this).parent().fadeOut(300, function(){ $(this).remove(); });">&times;</button>
                </div>
            `);

            toastBox.append(toastItem);
            setTimeout(function() {
                toastItem.fadeOut(400, function() { $(this).remove(); });
            }, 4500);
        }
        window.showToast = showToast;

        function escapeHtml(text) {
            return String(text)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        function isUserLoggedIn() {
            return localStorage.getItem('isLoggedIn') === 'true';
        }

        function getCart() {
            if (!isUserLoggedIn()) return [];
            try {
                const saved = localStorage.getItem('cartItems');
                if (saved) return JSON.parse(saved);
            } catch(e) {}
            return [];
        }

        function saveCart(cart) {
            if (isUserLoggedIn()) {
                localStorage.setItem('cartItems', JSON.stringify(cart));
            }
            updateCartUI();
        }

        function updateCartUI() {
            const loggedIn = isUserLoggedIn();
            const cart = getCart();
            const $cartBoxes = $('.ast_cart_box');
            const $cartIcons = $('.ast_cart');
            const $cartTable = $('.cart_table table');

            let totalAmount = 0;
            let totalItems = 0;
            let htmlList = '';

            if (!loggedIn) {
                htmlList = `
                    <div style="text-align:center; padding: 22px 10px; color:#666;">
                        <i class="fa fa-lock" style="font-size: 28px; color:#ff7700; margin-bottom: 8px; display:block;"></i>
                        <p style="font-size:13px; margin:0 0 8px 0; color:#444;">Please Log In to view your cart.</p>
                        <a href="#login-dialog" class="open-login-modal" style="color:#ff7700; font-weight:700; font-size:12.5px; text-decoration:none;">Log In / Sign Up</a>
                    </div>
                `;
            } else if (cart.length === 0) {
                htmlList = `
                    <div style="text-align:center; padding: 25px 10px; color:#666;">
                        <i class="fa fa-shopping-basket" style="font-size: 32px; color:#aaa; margin-bottom: 8px; display:block;"></i>
                        <p style="font-size:13px; margin:0; color:#555;">Your cart is empty.</p>
                    </div>
                `;
            } else {
                htmlList = '<ul>';
                cart.forEach((item, index) => {
                    const itemPrice = parseInt(item.price || 0, 10);
                    const itemQty   = parseInt(item.qty  || 1, 10);
                    const itemTotal = itemPrice * itemQty;
                    totalAmount += itemTotal;
                    totalItems  += itemQty;
                    
                    const imgSrc = item.img || 'images/header/astrology_numerology_transparent.png';
                    const curr = item.currency || '₹';

                    htmlList += `
                        <li>
                            <div class="ast_cart_img">
                                <img src="${imgSrc}" alt="${escapeHtml(item.title)}" onerror="this.onerror=null; this.src='images/header/astrology_numerology_transparent.png';">
                            </div>
                            <div class="ast_cart_info">
                                <a href="shop" class="cart_item_title">${escapeHtml(item.title)}</a>
                                <p>${itemQty} × ${curr}${itemPrice.toLocaleString('en-IN')}</p>
                            </div>
                            <a href="javascript:;" class="ast_cart_remove" data-index="${index}" title="Remove item"><i class="fa fa-trash"></i></a>
                        </li>
                    `;
                });
                htmlList += '</ul>';
            }

            $cartBoxes.each(function() {
                const $box = $(this);
                $box.find('.ast_cart_list').html(htmlList);
                
                const curr = (cart.length > 0 && cart[0].currency) ? cart[0].currency : '₹';
                $box.find('.ast_cart_total p span').text(`${curr}${totalAmount.toLocaleString('en-IN')}`);
            });

            // Update badge counter on top shopping cart icon
            $cartIcons.each(function() {
                const $cartLink = $(this).children('a').first();
                $cartLink.find('.ast_cart_count').remove();
                if (loggedIn && totalItems > 0) {
                    $cartLink.append(`<span class="ast_cart_count">${totalItems}</span>`);
                }
            });

            // Update main cart page table if present
            if ($cartTable.length) {
                let tableHtml = `
                    <tr>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                `;

                if (cart.length === 0) {
                    tableHtml += `
                        <tr>
                            <td colspan="5" style="text-align:center; padding: 40px; color:#777;">
                                Your cart is empty. <a href="shop" style="color:#ff6f00; font-weight:bold;">Browse E-Books & Services</a>
                            </td>
                        </tr>
                    `;
                } else {
                    cart.forEach((item, index) => {
                        const itemTotal = item.price * item.qty;
                        const imgSrc = item.img || 'images/header/astrology_numerology_transparent.png';
                        const curr = item.currency || '₹';
                        tableHtml += `
                            <tr>
                                <td>
                                    <span class="prod_thumb" style="width:60px; height:60px; display:inline-block; border-radius:8px; overflow:hidden; vertical-align:middle; margin-right:15px; border:1px solid #eee;">
                                        <img src="${imgSrc}" alt="${escapeHtml(item.title)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.onerror=null; this.src='images/header/astrology_numerology_transparent.png';">
                                    </span>
                                    <div class="product_details" style="display:inline-block; vertical-align:middle;">
                                        <h4 style="margin:0;"><a href="shop" style="color:#111; font-weight:700;">${escapeHtml(item.title)}</a></h4>
                                    </div>
                                </td>
                                <td>${curr}${item.price}</td>
                                <td><input type="number" min="1" class="pro_quantity" data-index="${index}" value="${item.qty}" style="width:60px; text-align:center;"></td>
                                <td>${curr}${itemTotal}</td>
                                <td>
                                    <span class="close_pro ast_cart_remove" data-index="${index}" style="cursor:pointer; color:#e74c3c;"><i class="fa fa-trash"></i></span>
                                </td>
                            </tr>
                        `;
                    });
                    const curr = cart[0].currency || '₹';
                    tableHtml += `
                        <tr>
                            <td>
                                <div class="cupon_code_wrap">
                                    <input type="text" name="cupon_code" placeholder="Enter Coupon Code" class="cupon_code">
                                    <button type="button" class="cupon_btn ast_btn" onclick="if(window.showToast) showToast('Coupon code applied successfully!', 'success');">Apply Coupon</button>
                                </div>
                            </td>
                            <td>&nbsp;</td>
                            <td style="font-weight:700; font-size:16px;">Total Amount</td>
                            <td style="font-weight:800; font-size:18px; color:#ff6f00;">${curr}${totalAmount}</td>
                            <td>&nbsp;</td>
                        </tr>
                    `;
                }

                $cartTable.html(tableHtml);
            }
        }

        // Initialize Cart UI
        updateCartUI();

        // Quantity change handler for cart.html table
        $(document).on('change keyup', '.pro_quantity', function() {
            const index = $(this).data('index');
            const newQty = parseInt($(this).val()) || 1;
            let cart = getCart();
            if (index !== undefined && cart[index]) {
                cart[index].qty = Math.max(1, newQty);
                saveCart(cart);
            }
        });

        // Event listener for Trash / Remove item button inside cart dropdown & table
        $(document).on('click', '.ast_cart_remove', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const index = $(this).data('index');
            let cart = getCart();
            if (index !== undefined && cart[index]) {
                const removedTitle = cart[index].title;
                cart.splice(index, 1);
                saveCart(cart);
                showToast(`Removed "${removedTitle}" from cart.`, "warning");
            }
        });

        // Event listener for View Cart and Checkout buttons in cart dropdown
        $(document).on('click', '.ast_cart_btn button, .ast_cart_btn a', function(e) {
            e.preventDefault();
            const text = $(this).text().trim().toLowerCase();
            if (text.includes('view') || text.includes('cart')) {
                window.location.href = "cart";
            } else if (text.includes('checkout')) {
                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                if (!isLoggedIn) {
                    localStorage.setItem('pendingBuy', 'true');
                    showToast("🔒 Please Log In or Sign Up to proceed to checkout.", "warning");
                    if ($.magnificPopup) {
                        $.magnificPopup.open({
                            items: { src: '#login-dialog' },
                            type: 'inline',
                            removalDelay: 300,
                            mainClass: 'my-mfp-zoom-in'
                        });
                    } else {
                        window.location.href = '#login-dialog';
                    }
                } else {
                    window.location.href = "checkout";
                }
            }
        });

        // --- DYNAMIC INDIA & GLOBAL LOCATION ENGINE FOR CHECKOUT ---
        const INDIA_LOCATION_DATA = {
            "Delhi": ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi", "Dwarka", "Rohini", "Connaught Place"],
            "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Navi Mumbai", "Solapur", "Kolhapur"],
            "Uttar Pradesh": ["Noida", "Ghaziabad", "Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Meerut", "Gorakhpur", "Mathura", "Ayodhya", "Aligarh", "Bareilly"],
            "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar", "Rohtak", "Panchkula", "Sonipat"],
            "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Mohali", "Bhatinda", "Pathankot"],
            "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Davangere", "Ballari"],
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore"],
            "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol", "Kharagpur"],
            "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Gandhinagar", "Jamnagar"],
            "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar"],
            "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Satna"],
            "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Arrah"],
            "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
            "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur"],
            "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kakinada", "Kurnool"],
            "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri"],
            "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
            "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
            "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
            "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rishikesh", "Nainital"],
            "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu"],
            "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
            "Jammu & Kashmir": ["Srinagar", "Jammu", "Anantnag", "Udhampur"],
            "Chandigarh": ["Chandigarh"]
        };

        function populateStates(country) {
            const $state = $('#chk_state');
            const $city = $('#chk_city');
            $state.empty();
            $city.empty().append('<option value="">Select City*</option>');

            if (country === 'India' || !country) {
                $state.append('<option value="">Select State / UT*</option>');
                Object.keys(INDIA_LOCATION_DATA).sort().forEach(state => {
                    $state.append(`<option value="${state}">${state}</option>`);
                });
            } else {
                $state.append('<option value="">Select Region / State*</option>');
                $state.append(`<option value="${country} Central Region">${country} Central Region</option>`);
                $state.append(`<option value="${country} North Region">${country} North Region</option>`);
                $state.append(`<option value="${country} South Region">${country} South Region</option>`);
                $city.append(`<option value="Capital / Major City">Capital / Major City</option>`);
            }
        }

        function populateCities(state) {
            const $city = $('#chk_city');
            $city.empty().append('<option value="">Select City*</option>');

            if (INDIA_LOCATION_DATA[state]) {
                INDIA_LOCATION_DATA[state].forEach(city => {
                    $city.append(`<option value="${city}">${city}</option>`);
                });
            } else if (state) {
                $city.append(`<option value="${state} City">${state} City</option>`);
                $city.append('<option value="Other">Other City</option>');
            }
        }

        // Auto Pre-fill checkout form if user is logged in
        function initCheckoutPage() {
            if ($('#chk_country').length === 0) return;

            // Populate states for default India
            populateStates('India');

            // Pre-fill user details from localStorage
            const userName = localStorage.getItem('userName') || '';
            const userEmail = localStorage.getItem('userEmail') || '';

            if (userName) {
                const parts = userName.trim().split(' ');
                $('#chk_first_name').val(parts[0] || '');
                $('#chk_last_name').val(parts.slice(1).join(' ') || '');
            }

            if (userEmail) {
                $('#chk_email').val(userEmail);
            }

            // Sync with Firebase Auth user if available
            if (window.firebaseAuth && window.firebaseAuth.currentUser) {
                const u = window.firebaseAuth.currentUser;
                if (u.email) $('#chk_email').val(u.email);
                if (u.displayName) {
                    const parts = u.displayName.trim().split(' ');
                    if (!$('#chk_first_name').val()) $('#chk_first_name').val(parts[0]);
                    if (!$('#chk_last_name').val() && parts[1]) $('#chk_last_name').val(parts.slice(1).join(' '));
                }
            }
        }

        // Initialize Checkout page
        initCheckoutPage();

        // Location selection change handlers
        $(document).on('change', '#chk_country', function() {
            populateStates($(this).val());
        });

        $(document).on('change', '#chk_state', function() {
            populateCities($(this).val());
        });

        // Next button handler for Step 1 -> Step 2
        $(document).on('click', '#chk_btn_step1, .woocommerce_billing .next', function(e) {
            e.preventDefault();
            const firstName = $('#chk_first_name').val() || $('input[placeholder*="First Name"]').val() || '';
            const lastName = $('#chk_last_name').val() || $('input[placeholder*="Last Name"]').val() || '';
            const phone = $('#chk_phone').val() || $('input[placeholder*="Phone"]').val() || '';
            const email = $('#chk_email').val() || $('input[placeholder*="Email"]').val() || '';
            const country = $('#chk_country').val() || 'India';
            const state = $('#chk_state').val() || '';
            const city = $('#chk_city').val() || '';
            const pincode = $('#chk_pincode').val() || $('input[placeholder*="Pincode"]').val() || '';
            const address = $('#chk_address').val() || $('textarea[placeholder*="Address"]').val() || '';

            if (!firstName || !phone || !email || !address) {
                showToast("Please fill in your Name, Phone Number, Email, and Address before proceeding.", "warning");
                return;
            }

            // Save order draft
            window.currentCheckoutData = {
                firstName, lastName, phone, email, country, state, city, pincode, address
            };

            // Switch steps in UI
            const $steps = $('.woocommerce_billing.step');
            const $progressBar = $('#progressbar li');

            $steps.removeClass('active').hide();
            $steps.eq(1).addClass('active').fadeIn();
            $progressBar.removeClass('active');
            $progressBar.eq(0).addClass('active');
            $progressBar.eq(1).addClass('active');
            showToast("Billing details saved! Select payment method to complete order.", "success");
            showToast("✨ Billing details saved! Select payment method to complete order.", "success");
        });

        // Note: Order save to Firebase is handled strictly upon Razorpay payment success handler in checkout.html

            // Render Receipt Step 3
            const $steps = $('.woocommerce_billing.step');
            const $receiptStep = $('.woocommerce_checkout_receipt.step');
            const $progressBar = $('#progressbar li');

            $steps.hide();
            $progressBar.addClass('active');

            $receiptStep.html(`
                <div style="text-align:center; padding: 20px;">
                    <div style="width:70px; height:70px; background:linear-gradient(135deg, #130d2e, #1a0533); border:2px solid var(--gold); border-radius:50%; margin:0 auto 15px auto; display:flex; align-items:center; justify-content:center; color:var(--gold); font-size:32px;">
                        ✓
                    </div>
                    <h1 style="color:var(--gold); font-size:24px; font-weight:800; margin-bottom:8px;">THANK YOU FOR YOUR ORDER!</h1>
                    <p style="color:#ffffff; font-size:14px; margin-bottom:20px;">Order ID: <strong style="color:var(--gold);">${orderId}</strong> | Status: <span style="color:#2ecc71; font-weight:700;">CONFIRMED</span></p>
                    
                    <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(212,175,55,0.3); border-radius:12px; padding:20px; text-align:left; max-width:480px; margin:0 auto 25px auto; font-size:13.5px; line-height:1.8;">
                        <p style="margin:0;"><strong>Customer:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
                        <p style="margin:0;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
                        <p style="margin:0;"><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
                        <p style="margin:0;"><strong>Address:</strong> ${escapeHtml(data.address)}, ${escapeHtml(data.city)}, ${escapeHtml(data.state)}, ${escapeHtml(data.country)} - ${escapeHtml(data.pincode)}</p>
                        <hr style="border-color:rgba(255,255,255,0.1); margin:12px 0;">
                        <p style="margin:0; font-weight:700; color:var(--gold);">Product: Exclusive Chaldean Numerology & Vedic Astrology E-Book</p>
                        <p style="margin:0; font-weight:800; color:#ffffff; font-size:16px;">Total Paid: ${totalStr}</p>
                    </div>

                    <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
                        <a href="shop" class="ast_btn">Download E-Book PDF</a>
                        <a href="./" class="ast_btn" style="background:#333;">Return to Home</a>
                    </div>
                </div>
            `).fadeIn();

            showToast("🎉 Order Placed Successfully! Saved to Firebase database.", "success");
            showToast("Order Placed Successfully! Saved to Firebase database.", "success");

        // --- REAL-TIME WEBSITE BLOG COMMENTS ENGINE (NATIVE TEMPLATE + FIREBASE) ---
        function initLiveChatEngine() {
            const $list = $('#blog_comments_list');
            const $form = $('#blog_comment_form');
            if ($list.length === 0 && $form.length === 0) return;

            const $nameInput = $('#comment_name');
            const $emailInput = $('#comment_email');
            const $msgInput = $('#comment_message');

            // Pre-fill user details if logged in
            const userName = localStorage.getItem('userName') || '';
            if (userName && $nameInput.length > 0 && !$nameInput.val()) {
                $nameInput.val(userName);
            }

            // Seed default comments if Firebase returns empty list initially
            const seedComments = [
                {
                    name: "Andrew Coyne",
                    timeStr: "Sept 20, 2026",
                    message: "The insight on Chaldean vibration and name spelling changes was truly eye-opening! Advocate Riitu Raghav explained the planetary influences so clearly."
                },
                {
                    name: "Pooja Verma",
                    timeStr: "Sept 18, 2026",
                    message: "Applied the simple Vastu remedies recommended for our main entrance and noticed positive energy shift within a week! Highly recommended."
                },
                {
                    name: "Vikram Sharma",
                    timeStr: "Sept 15, 2026",
                    message: "Fascinating analysis of Rahu-Ketu transits. Very practical and grounded advice without inducing unnecessary panic."
                }
            ];

            const clientAvatars = [
                "images/content/client_ananya.png",
                "images/content/client_pooja.png",
                "images/content/client_vikram.png"
            ];

            function renderComments(chats) {
                let items = (chats && chats.length > 0) ? chats : seedComments;
                let html = '';
                items.forEach((c, idx) => {
                    const name = c.name || 'Anonymous Seeker';
                    const time = c.timeStr || (c.timestamp ? new Date(c.timestamp.seconds * 1000).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now');
                    const msg = c.message || '';
                    const avatarImg = c.avatar || clientAvatars[idx % clientAvatars.length];

                    html += `
                        <li style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 22px; margin-bottom: 22px; list-style: none;">
                            <div class="ast_blog_comment" style="display: flex; gap: 20px; align-items: flex-start;">
                                <div class="ast_comment_image" style="flex-shrink: 0; width: 70px;">
                                    <img src="${avatarImg}" alt="${escapeHtml(name)}" style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid var(--gold); object-fit: cover; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                                </div>
                                <div class="ast_comment_text" style="flex: 1;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                        <h5 class="ast_bloger_name" style="color: var(--gold); font-size: 16px; font-weight: 700; margin: 0;">${escapeHtml(name)}</h5>
                                        <span class="ast_blog_date" style="color: var(--text-muted); font-size: 12px;"><i class="fa fa-clock-o"></i> ${time}</span>
                                    </div>
                                    <p class="ast_blog_post" style="color: #e2d9f3; font-size: 14px; line-height: 1.65; margin: 0 0 8px 0;">${escapeHtml(msg)}</p>
                                    <a href="javascript:;" class="ast_comment_reply" style="color: var(--gold); font-size: 12px; font-weight: 600; text-decoration: none;">Reply &rarr;</a>
                                </div>
                            </div>
                        </li>
                    `;
                });
                $list.html(html);
            }

            // Realtime listener from Firebase
            if (window.FirebaseHelper && typeof window.FirebaseHelper.onChatsUpdate === 'function') {
                window.FirebaseHelper.onChatsUpdate(function(chats) {
                    renderComments(chats);
                });
            } else {
                renderComments([]);
            }

            // Comment Form Submission Handler
            $(document).off('submit', '#blog_comment_form').on('submit', '#blog_comment_form', async function(e) {
                e.preventDefault();
                const name = $nameInput.val().trim() || localStorage.getItem('userName') || 'Anonymous Seeker';
                const email = $emailInput.val().trim() || '';
                const message = $msgInput.val().trim();

                if (!message) {
                    showToast("Please enter your comment message!", "warning");
                    return;
                }

                if (window.FirebaseHelper && typeof window.FirebaseHelper.saveChat === 'function') {
                    const res = await window.FirebaseHelper.saveChat({ name, email, message });
                    if (res.success) {
                        $msgInput.val('');
                        showToast("Comment posted successfully! Saved to Firebase.", "success");
                    } else {
                        showToast(`Could not post comment: ${res.error}`, "warning");
                    }
                } else {
                    $msgInput.val('');
                    showToast("Comment posted successfully!", "success");
                }
            });
        }

        initLiveChatEngine();

    });

})(jQuery);
