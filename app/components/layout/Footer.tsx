import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Logo className="h-7 w-7" />
          <span className="font-bold text-gray-900">FamLedger</span>
          <span className="text-gray-400">·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <p className="text-xs text-gray-500">
          Built for families. Your data stays yours.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
