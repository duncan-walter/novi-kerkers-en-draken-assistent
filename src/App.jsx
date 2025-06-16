// Styling
import './App.css'

// Framework dependencies
import {useForm} from "react-hook-form";

// Components
import NumberFormControl from "./components/form-controls/NumberFormControl/NumberFormControl.jsx";
import PasswordFormControl from "./components/form-controls/PasswordFormControl/PasswordFormControl.jsx";
import SearchFormControl from "./components/form-controls/SearchFormControl/SearchFormControl.jsx";
import SelectFormControl from "./components/form-controls/SelectFormControl/SelectFormControl.jsx";
import SliderFormControl from "./components/form-controls/SliderFormControl/SliderFormControl.jsx";
import TextareaFormControl from "./components/form-controls/TextareaFormControl/TextareaFormControl.jsx";
import TextFormControl from "./components/form-controls/TextFormControl/TextFormControl.jsx";

function App() {
  const {
    handleSubmit,
    formState: {errors},
    register
  } = useForm();

  function handleFormSubmit(data) {
    console.log(data);
  }

  return (
    <main>
      <h1>🛠️ Form control testing zone 🚧</h1>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <NumberFormControl
          id="numberFormControl"
          name="numberFormControl"
          label="Number"
          register={register}
          error={errors.numberFormControl}
          validationRules={{
            required: true,
            minimumValue: 0,
            maximumValue: 10
          }}
        />
        <NumberFormControl
          id="numberFormControlWithPlaceholder"
          name="numberFormControlWithPlaceholder"
          label="Number with placeholder"
          placeholder="0"
          register={register}
          error={errors.numberFormControlWithPlaceholder}
        />

        <PasswordFormControl
          id="passwordFormControl"
          name="passwordFormControl"
          label="Password"
          register={register}
          error={errors.passwordFormControl}
          validationRules={{
            required: true,
            minimumLength: 8,
            maximumLength: 255
          }}
        />

        <SearchFormControl
          id="searchFormControl"
          name="searchFormControl"
          label="Search"
          register={register}
          error={errors.searchFormControl}
          validationRules={{
            required: true,
            minimumLength: 0,
            maximumLength: 50
          }}
        />
        <SearchFormControl
          id="searchFormControlWithPlaceholder"
          name="searchFormControlWithPlaceholder"
          label="Search with placeholder"
          placeholder="enter search term"
          register={register}
          error={errors.searchFormControlWithPlaceholder}
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
          register={register}
          error={errors.selectFormControl}
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
          register={register}
          error={errors.selectFormControlWithPlaceholder}
          validationRules={{
            required: true
          }}
        />

        <SliderFormControl
          id="sliderFormControl"
          name="sliderFormControl"
          label="Slider"
          minimumValue={0}
          maximumValue={30}
          register={register}
          error={errors.sliderFormControl}
        />

        <TextareaFormControl
          id="textareaFormControl"
          name="textareaFormControl"
          label="Textarea"
          register={register}
          error={errors.textareaFormControl}
          validationRules={{
            required: true,
            minimumLength: 10,
            maximumLength: 500
          }}
        />
        <TextareaFormControl
          id="textareaFormControlWithPlaceholder"
          name="textareaFormControlWithPlaceholder"
          label="Textarea with placeholder"
          placeholder="enter textarea"
          register={register}
          error={errors.textareaFormControlWithPlaceholder}
        />

        <TextFormControl
          id="textControl"
          name="textControl"
          label="Text"
          register={register}
          error={errors.textControl}
          validationRules={{
            required: true,
            minimumLength: 8,
            maximumLength: 50
          }}
        />
        <TextFormControl
          id="textControlWithPlaceholder"
          name="textControlWithPlaceholder"
          label="Text with placeholder"
          placeholder="enter text"
          register={register}
          error={errors.textControlWithPlaceholder}
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App