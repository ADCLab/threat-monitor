export default function Footer() {
  return (
    <footer className="flex-none py-4 text-center text-sm text-gray-500 bg-gray-50">
      <a
        href="https://adc-ucf.com/"
        className="hover:underline"
        target="_blank"
      >
        For more information, visit our website
      </a>
      <br />© {new Date().getFullYear()} Lab Survey. All rights reserved.
    </footer>
  );
}
