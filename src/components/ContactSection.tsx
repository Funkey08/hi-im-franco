import { Mail, Github, Linkedin } from "lucide-react"; // Or from react-icons if you prefer

const ContactSection = () => {
  return (
    <footer className="w-full pt-12 pb-8 px-4 text-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-6">
        <h2 className="text-xl">Reach out to me!</h2>

        <div className="flex space-x-8 text-white">
          {/* GitHub */}
          <a
            href="https://github.com/Funkey08"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors duration-300"
          >
            <Github size={32} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/franco-miguel-valencia-6a650b219/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            <Linkedin size={32} />
          </a>

          {/* Email */}
          <a
            href="mailto:francomiguel.valencia@gmail.com"
            className="hover:text-pink-400 transition-colors duration-300"
          >
            <Mail size={32} />
          </a>
        </div>

        {/* <p className="text-sm text-neutral-400">
          © {new Date().getFullYear()} Franco Miguel Valencia. All rights
          reserved.
        </p> */}
      </div>
    </footer>
  );
};

export default ContactSection;
