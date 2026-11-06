
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

import './Contact.css';

const email = 'mrmohsinali67@gmail.com';
const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
const whatsapp = '923085938317';
const whatsappLink = `https://wa.me/${whatsapp}`;

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-eyebrow">
          <span className="contact-eyebrow-line" />
          LET'S CONNECT
          <span className="contact-eyebrow-line" />
        </div>

        <h2 className="contact-title">
          Have An Idea?
          <br />
          <span>Let's Build It.</span>
        </h2>

        <p className="contact-description">
          Have a project in mind, an interesting opportunity,
          or just want to connect? I'd love to hear from you.
          Let's turn your next idea into something meaningful.
        </p>

        <div className="contact-actions">
          <a
            href={emailLink}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-primary"
            aria-label={`Send an email to ${email}`}
          >
            <Mail size={19} />
            <span>Send Me An Email</span>
            <ArrowUpRight size={17} />
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-secondary"
          >
            <MessageCircle size={19} />
            <span>Chat On WhatsApp</span>
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="contact-email">
          <span className="contact-small-label">DIRECT EMAIL</span>

          <a
            href={emailLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Email ${email}`}
          >
            {email}
          </a>
        </div>

        <div className="contact-socials">
          <span className="contact-small-label">FIND ME ONLINE</span>

          <a
            href="https://github.com/vaqrion-solutions-dev/Astronomy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="contact-social-link"
          >
            GH
          </a>

          <a
            href="https://www.linkedin.com/in/mohsin-ali-662514447"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="contact-social-link"
          >
            in
          </a>

          <a
            href={emailLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            title="Email"
            className="contact-social-link"
          >
            <Mail size={18} />
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
            className="contact-social-link"
          >
            <MessageCircle size={18} />
          </a>
        </div>

        <div className="contact-bottom">
          <span className="contact-bottom-line" />
          <Sparkles size={16} />
          <span>LET'S CREATE SOMETHING EXTRAORDINARY</span>
          <Sparkles size={16} />
          <span className="contact-bottom-line" />
        </div>
      </div>
    </section>
  );
}
