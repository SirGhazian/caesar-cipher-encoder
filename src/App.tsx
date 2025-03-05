import { useState } from "react";
import "./App.css";
import { FaExchangeAlt } from "react-icons/fa";
import CreditsHeader from "./components/creditsHeader";

function App() {
  const [TextAreaBox1, SetTextAreaBox1] = useState("");
  const [TextAreaBox2, SetTextAreaBox2] = useState("");
  const [ShiftValue, SetShiftValue] = useState(1);

  const [TitleAreaBox1, SetTitleAreaBox1] = useState("Plain Text");
  const [TitleAreaBox2, SetTitleAreaBox2] = useState("Cipher Text");

  const [encode, setEncode] = useState(true);

  // Generate key
  function generateKey(shift: number, length: number): number[] {
    const key = [];
    for (let i = 0; i < length; i++) {
      key.push((shift * (i + 1)) % 26);
    }
    return key;
  }

  // Encrypt & Decrypt
  function dynamicCipher(text: string, shift: number, isEncoding: boolean = true): string {
    const key = generateKey(shift, text.length);

    return text.replace(/[a-zA-Z]/g, (char, index) => {
      const offset = char >= "a" ? 97 : 65;
      const shiftAmount = isEncoding ? key[index] : -key[index];
      return String.fromCharCode(((char.charCodeAt(0) - offset + shiftAmount + 26) % 26) + offset);
    });
  }

  function handleTextChange(text: string) {
    SetTextAreaBox1(text);
    SetTextAreaBox2(dynamicCipher(text, ShiftValue, encode));
  }

  function handleShiftChange(shift: number) {
    SetShiftValue(shift);
    SetTextAreaBox2(dynamicCipher(TextAreaBox1, Number(shift), encode));
  }

  function switchBox() {
    SetTextAreaBox1(TextAreaBox2);
    SetTextAreaBox2(TextAreaBox1);

    SetTitleAreaBox1(TitleAreaBox2);
    SetTitleAreaBox2(TitleAreaBox1);

    setEncode(!encode);
  }

  return (
    <>
      <section className="pattern absolute top-0 left-0 -z-10"></section>
      <CreditsHeader />
      <section className="w-screen h-svh flex flex-col items-center justify-center space-grotesk-regular">
        <section className="w-full flex sm:flex-col lg:flex-row items-center justify-center p-1.5 mb-3">
          <div className="w-full max-w-[35rem] h-[30rem] p-4 rounded-md bg-base-200 flex flex-col">
            <div
              className={`w-full h-12 mb-3 rounded-md flex items-center justify-center ${
                encode ? "bg-gray-500" : "bg-primary"
              }`}
            >
              <p className="text-xl space-grotesk-bold">{TitleAreaBox1}</p>
            </div>

            <textarea
              className="textarea w-full flex-grow duration-200 resize-none text-base"
              placeholder={"Your Text Goes Here..."}
              value={TextAreaBox1}
              onChange={(e) => handleTextChange(e.target.value)}
              spellCheck="false"
            ></textarea>

            <p className="mt-3 mb-2">Seed Key</p>

            <input
              type="number"
              value={ShiftValue}
              onChange={(e) => handleShiftChange(e.target.valueAsNumber)}
              className="input input-bordered w-full h-12 duration-200"
            />
          </div>

          <button
            className="btn btn-primary p-2 m-5  hover:scale-115 active:scale-100 duration-200 transition-all"
            onClick={switchBox}
          >
            <FaExchangeAlt className="size-full" />
          </button>

          <div className="w-full max-w-[35rem] h-[30rem] p-4 rounded-md bg-base-200 flex flex-col">
            <div
              className={`w-full h-12 mb-3 rounded-md flex items-center justify-center ${
                encode ? "bg-primary" : "bg-gray-500"
              }`}
            >
              <p className="text-xl space-grotesk-bold">{TitleAreaBox2}</p>
            </div>

            <textarea
              className="textarea w-full flex-grow duration-200 resize-none text-base"
              placeholder={". . ."}
              value={TextAreaBox2}
              readOnly
              spellCheck="false"
            ></textarea>
          </div>
        </section>
      </section>
    </>
  );
}

export default App;
