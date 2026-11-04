import { useRef, useState, type FormEvent } from "react";
import { EMAIL } from "../../data/site";

/**
 * "Open a channel": a compose box at the bottom of Home. There's no backend (static site), so Send
 * opens the visitor's own mail app with everything pre-filled; Copy puts the address on the clipboard.
 */
export default function ContactBox() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  const send = (e: FormEvent) => {
    e.preventDefault();
    const subject = name.trim() ? `Hello from ${name.trim()}` : "Hello from your website";
    const body = msg.trim() || "Hi Franco,\n\n";
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // clipboard blocked (e.g. insecure context): select the address so it can be copied by hand
      const el = document.getElementById("contact-address");
      if (el) window.getSelection()?.selectAllChildren(el);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="contact" aria-labelledby="contact-title">
      <h2 className="section-head" id="contact-title">// <b>open a channel</b></h2>
      <p className="contact-lede">Hiring, collaborating, or just curious? Send me a message.</p>
      <form className="contact-box" onSubmit={send}>
        <span className="meter-screw tl" /><span className="meter-screw tr" />
        <div className="contact-head">
          <span className="contact-to">to: <b id="contact-address">{EMAIL}</b></span>
          <button type="button" className="contact-copy" onClick={copy} data-probe="COPY">
            {copied ? "copied ✓" : "copy address"}
          </button>
        </div>
        <label className="contact-field">
          <span>from</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" autoComplete="name" maxLength={80} />
        </label>
        <label className="contact-field area">
          <span>message</span>
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Hi Franco, …" rows={4} maxLength={4000} />
        </label>
        <div className="contact-foot">
          <small>opens in your email app</small>
          <button type="submit" className="contact-send" data-probe="SEND">Send <span aria-hidden="true">→</span></button>
        </div>
      </form>
    </section>
  );
}
