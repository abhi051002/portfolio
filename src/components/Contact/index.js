import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaPaperPlane
} from "react-icons/fa";
import {
  SectionHeading,
  ScrollReveal,
} from "../ui/ScrollReveal";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const form = useRef();
  const { bioData } = usePortfolio();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setOpen(true);
      form.current.reset();
      setTimeout(() => setOpen(false), 5000);
    } catch (err) {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const socialLinks = [
    { icon: FaGithub, href: bioData?.github, label: "GitHub" },
    { icon: FaLinkedin, href: bioData?.linkedin, label: "LinkedIn" },
    { icon: FaTwitter, href: bioData?.twitter, label: "Twitter" },
    { icon: FaInstagram, href: bioData?.insta, label: "Instagram" },
  ].filter((s) => s.href);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-violet-500/5 transition-all duration-200";

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeading
          title="Get In"
          highlight="Touch"
          subtitle="Feel free to reach out for opportunities, collaborations or just a chat!"
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Contact info */}
          <ScrollReveal preset="slide-left" className="lg:col-span-2 flex flex-col gap-5">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-5">Contact Info</h3>
              <div className="flex flex-col gap-4">
                {bioData?.email && (
                  <a
                    href={`mailto:${bioData.email}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-violet-400 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                      <FaEnvelope size={16} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Email</p>
                      <p className="text-sm">{bioData.email}</p>
                    </div>
                  </a>
                )}
                {bioData?.phone && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <FaPhone size={14} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Phone</p>
                      <p className="text-sm">{bioData.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <FaMapMarkerAlt size={14} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Location</p>
                    <p className="text-sm">Bhubaneswar, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="text-white font-bold text-base mb-4">Follow Me</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-violet-500/15 border border-white/10 hover:border-violet-500/30 rounded-xl text-slate-400 hover:text-violet-300 text-sm transition-all duration-200"
                    >
                      <Icon size={15} />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal preset="slide-right" delay={0.1} className="lg:col-span-3">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <FaPaperPlane className="text-violet-400" size={18} /> Send a Message 🚀
              </h3>

              <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs font-medium mb-1.5 block">Your Name</label>
                    <input
                      type="text"
                      name="from_name"
                      placeholder="John Doe"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-medium mb-1.5 block">Your Email</label>
                    <input
                      type="email"
                      name="from_email"
                      placeholder="john@example.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-medium mb-1.5 block">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="I'd like to discuss..."
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-medium mb-1.5 block">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: sending ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={15} /> Send Message
                    </>
                  )}
                </motion.button>

                {/* Success toast */}
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm"
                  >
                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {/* Error toast */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
                  >
                    ❌ Failed to send. Please try again or email me directly.
                  </motion.div>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;