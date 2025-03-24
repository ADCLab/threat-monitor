export default function Nav() {
  return (
    <nav className="flex items-center p-2 bg-gray-800 text-white">
      <a
        href="https://adc-ucf.com/"
        className="hover:underline"
        target="_blank"
      >
        <img src="adcLab.png" alt="Logo" className="h-16 pr-2"></img>
      </a>
      <h1 className="text-2xl font-bold">ADC Lab</h1>
    </nav>
  );
}
