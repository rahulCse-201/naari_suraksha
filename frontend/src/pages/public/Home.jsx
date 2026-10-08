import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import {
  ShieldAlert,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Lock,
  Radio,
  Sparkles
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
          {/* Subtle Background Glow Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Text & CTAs */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold tracking-wide">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
                  <span>Version 1.0 — Reliable Emergency SOS Foundation</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-100 leading-[1.15]">
                  Instant Protection & <br />
                  <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                    Emergency Response
                  </span>{' '}
                  for Women
                </h1>

                <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Naari Suraksha equips women with a rapid single-tap emergency SOS system, instant browser geolocation broadcast, and direct linkage to trusted contact networks and response admins.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-bold text-base shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Create Free Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <a
                    href="#how-it-works"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-slate-200 font-semibold text-base hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    <span>How SOS Works</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                </div>

                {/* Micro trust indicators */}
                <div className="pt-6 border-t border-slate-900 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Instant Location GPS</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Secure JWT Auth</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>PWA Mobile Ready</span>
                  </div>
                </div>
              </div>

              {/* Right Column Interactive/Visual Banner */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-rose-900/20 backdrop-blur-xl relative">
                  {/* Glowing header badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                        Live SOS Demo Card
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">STATUS: READY</span>
                  </div>

                  {/* Main Mock SOS Button */}
                  <div className="py-8 text-center space-y-4">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 rounded-full bg-rose-600/30 blur-xl animate-pulse" />
                      <div className="relative w-36 h-36 mx-auto rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-500 p-1 shadow-2xl flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-slate-950/80 flex flex-col items-center justify-center border border-rose-500/40 text-center p-2">
                          <ShieldAlert className="w-10 h-10 text-rose-500 mb-1" />
                          <span className="text-xs font-black tracking-widest text-white uppercase">
                            PRESS SOS
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">
                      Requests Browser Geolocation &amp; Alerts Monitoring Admins
                    </p>
                  </div>

                  {/* Mock details card */}
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Coordinates:</span>
                      <span className="font-mono text-slate-200">28.6139° N, 77.2090° E</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Response Hub:</span>
                      <span className="text-emerald-400 font-medium">Active Monitoring</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-20 bg-slate-900/50 border-y border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-xs uppercase font-bold tracking-widest text-rose-500">Core Capabilities</h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">
                Engineered for High-Reliability Emergency Handling
              </p>
              <p className="text-slate-400 text-base">
                Naari Suraksha V1 focuses strictly on rapid emergency signal creation, precise geolocation capture, and admin incident response.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-rose-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">One-Tap Emergency SOS</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Prominent SOS trigger with confirmation safeguard to prevent accidental clicks while ensuring fast deployment in crisis.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-rose-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">Trusted Emergency Contacts</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Manage personal emergency contacts with phone numbers and relationships attached securely to your account.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-rose-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">Precise Geolocation Sharing</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Captures latitude and longitude via standard browser geolocation right at the exact instant SOS is pressed.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-rose-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">Admin Command Dashboard</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Dedicated admin panel displays live active emergencies with open Leaflet maps, contact information, and resolution controls.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-rose-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">Emergency Incident History</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Keep track of all previous emergency triggers, timestamps, location coordinates, and resolution statuses.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-rose-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Radio className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">Android PWA Installation</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Installable on Android mobile devices with service worker support and full app-shell responsiveness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-xs uppercase font-bold tracking-widest text-rose-500">Simple Workflow</h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">How Naari Suraksha Works</p>
              <p className="text-slate-400 text-base">Five streamlined steps from registration to emergency resolution.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {[
                { step: '01', title: 'Create Account', desc: 'Register with name, email, and phone.' },
                { step: '02', title: 'Add Contacts', desc: 'Add trusted emergency contact details.' },
                { step: '03', title: 'Press SOS', desc: 'Tap SOS button & confirm emergency.' },
                { step: '04', title: 'Share Location', desc: 'Browser captures exact GPS location.' },
                { step: '05', title: 'Admin Response', desc: 'Appears in Admin Dashboard map.' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between relative"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-rose-500/80 font-mono">{item.step}</span>
                    <CheckCircle2 className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-base mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SAFETY & TRUST SECTION */}
        <section id="about-safety" className="py-20 bg-slate-900/40 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transparent Safety System</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">
                  Reliable Infrastructure Built with Trust
                </h2>
                <p className="text-slate-300 leading-relaxed text-base">
                  Naari Suraksha Version 1 focuses strictly on core emergency infrastructure: persistent storage of user SOS broadcasts, direct display of GPS coordinates on interactive maps, and complete contact details accessible to authorized safety monitoring admins.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" />
                    <span>No unverified automatic emergency claims</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" />
                    <span>Strict role authorization (USER vs ADMIN)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" />
                    <span>Privacy protected user contact information</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" />
                    <span>OpenStreetMap Leaflet integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
              Ready to experience Naari Suraksha?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base">
              Set up your safety profile today, add your emergency contacts, and ensure your emergency SOS line is active.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-rose-600 text-white font-bold text-base hover:bg-rose-500 shadow-xl shadow-rose-600/30 transition-all"
              >
                Register Account Now
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold hover:bg-slate-800 transition-all"
              >
                Existing User Login
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
