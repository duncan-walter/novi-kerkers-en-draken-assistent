import './App.css'

// Component imports
import NumberFormControl from "./components/form-controls/NumberFormControl/NumberFormControl.jsx";
import PasswordFormControl from "./components/form-controls/PasswordFormControl/PasswordFormControl.jsx";
import SearchFormControl from "./components/form-controls/SearchFormControl/SearchFormControl.jsx";
import SelectFormControl from "./components/form-controls/SelectFormControl/SelectFormControl.jsx";
import SliderFormControl from "./components/form-controls/SliderFormControl/SliderFormControl.jsx";
import TextareaFormControl from "./components/form-controls/TextareaFormControl/TextareaFormControl.jsx";
import TextFormControl from "./components/form-controls/TextFormControl/TextFormControl.jsx";

function App() {
  return (
    <main>
      <h1>🛠️ Form control testing zone 🚧</h1>

      <NumberFormControl
        id="numberFormControl"
        name="numberFormControl"
        label="Number"
      />
      <NumberFormControl
        id="numberFormControlWithPlaceholder"
        name="numberFormControlWithPlaceholder"
        label="Number with placeholder"
        placeholder="0"
      />

      <PasswordFormControl
        id="passwordFormControl"
        name="passwordFormControl"
        label="Password"
      />

      <SearchFormControl
        id="searchFormControl"
        name="searchFormControl"
        label="Search"
      />
      <SearchFormControl
        id="searchFormControlWithPlaceholder"
        name="searchFormControlWithPlaceholder"
        label="Search with placeholder"
        placeholder="enter search term"
      />

      <SelectFormControl
        id="selectFormControl"
        name="selectFormControl"
        label="Select"
        options={[
          {value: "1", label: "value 1"},
          {value: "2", label: "value 2"},
          {value: "3", label: "value 3"}
        ]}
        showPlaceholder={false}
      />
      <SelectFormControl
        id="selectFormControlWithPlaceholder"
        name="selectFormControlWithPlaceholder"
        label="Select with placeholder"
        options={[
          {value: "1", label: "value 1"},
          {value: "2", label: "value 2"},
          {value: "3", label: "value 3"}
        ]}
      />

      <SliderFormControl
        id="sliderFormControl"
        name="sliderFormControl"
        label="Slider"
      />

      <TextareaFormControl
        id="textareaFormControl"
        name="textareaFormControl"
        label="Textarea"
      />
      <TextareaFormControl
        id="textareaFormControlWithPlaceholder"
        name="textareaFormControlWithPlaceholder"
        label="Textarea with placeholder"
        placeholder="enter textarea"
      />

      <TextFormControl
        id="textControl"
        name="textControl"
        label="Text"
      />
      <TextFormControl
        id="textControlWithPlaceholder"
        name="textControlWithPlaceholder"
        label="Text with placeholder"
        placeholder="enter text"
      />
    </main>
  );
}

export default App