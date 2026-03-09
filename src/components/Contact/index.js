import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionHeading from "../ui/SectionHeading";
import {
  FaEnvelope, FaPhone, FaLinkedin, FaGithub,
  FaTwitter, FaInstagram, FaPaperPlane, FaMapMarkerAlt,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const INITIAL = { name: "", email: "", message: "" };

const Contact = () => {
  const { bioData } = usePortfolio();
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-info",
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-info", start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        ".contact-form",
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-form", start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_id",
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_id",
        { from_name: form.name, from_email: form.email, message: form.message, to_name: bioData?.name },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "public_key"
      );
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const socials = [
    { label: "GitHub",    href: bioData?.github,   Icon: FaGithub,    color: "hover:text-white hover:border-white/40" },
    { label: "LinkedIn",  href: bioData?.linkedin,  Icon: FaLinkedin,  color: "hover:text-blue-400 hover:border-blue-400/50" },
    { label: "Twitter",   href: bioData?.twitter,   Icon: FaTwitter,   color: "hover:text-sky-400 hover:border-sky-400/50" },
    { label: "Instagram", href: bioData?.insta,     Icon: FaInstagram, color: "hover:text-pink-400 hover:border-pink-400/50" },
  ].filter((s) => s.href);

  return (
    <section ref={sectionRef} id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Get in Touch"
          title="Let's"
          highlight="Connect"
          subtitle="I'm open to new opportunities, freelance gigs, collaborations, or just a friendly chat."
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* ── Info panel ──────────────────── */}
          <div className="contact-info opacity-0 flex flex-col gap-6">
            <p className="text-slate-400 leading-relaxed text-base">
              Whether you have a project in mind, a question, or just want to say hello — my inbox is always open. I'll get back to you as soon as possible.
            </p>

            <div className="flex flex-col gap-4">
              {bioData?.email && (
                <a href={`mailto:${bioData.email}`} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl glass-strong flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 transition-colors border border-violet-500/20">
                    <FaEnvelope size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Email</div>
                    <div className="text-white text-sm font-medium group-hover:text-violet-300 transition-colors">{bioData.email}</div>
                  </div>
                </a>
              )}
              {bioData?.phone && (
                <a href={`tel:${bioData.phone}`} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl glass-strong flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors border border-cyan-500/20">
                    <FaPhone size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Phone</div>
                    <div className="text-white text-sm font-medium group-hover:text-cyan-300 transition-colors">{bioData.phone}</div>
                  </div>
                </a>
              )}
            </div>

            {/* Social links */}
            {socials.length > 0 && (
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Find me on</p>
                <div className="flex gap-2">
                  {socials.map(({ label, href, Icon, color }) => (
                    <a
                      key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-xl glass border border-white/8 flex items-center justify-center text-slate-400 transition-all duration-300 ${color}`}
                      title={label}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Contact Form ──────────────────── */}
          <form onSubmit={handleSubmit} className="contact-form opacity-0 glass-card rounded-2xl p-6 flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</label>
              <input
                name="name" value={form.name} onChange={handleChange} required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl text-white text-sm bg-white/5 border border-white/10 placeholder:text-slate-600 focus:outline-none focus:border-violet-500/60 focus:bg-white/7 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange} required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl text-white text-sm bg-white/5 border border-white/10 placeholder:text-slate-600 focus:outline-none focus:border-violet-500/60 focus:bg-white/7 transition-all duration-200"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange} required rows={5}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl text-white text-sm bg-white/5 border border-white/10 placeholder:text-slate-600 focus:outline-none focus:border-violet-500/60 focus:bg-white/7 transition-all duration-200 resize-none"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === "loading" || status === "success"}
              whileHover={status === "idle" ? { scale: 1.02, y: -1 } : {}}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                status === "success"
                  ? "bg-green-500/20 border border-green-500/40 text-green-400"
                  : status === "error"
                  ? "bg-red-500/20 border border-red-500/40 text-red-400"
                  : "btn-primary w-full justify-center"
              }`}
            >
              {status === "loading" ? (
                <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Sending...</>
              ) : status === "success" ? (
                "✓ Message Sent!"
              ) : status === "error" ? (
                "✗ Failed — try again"
              ) : (
                <span className="flex items-center gap-2"><FaPaperPlane size={13} /> Send Message</span>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;