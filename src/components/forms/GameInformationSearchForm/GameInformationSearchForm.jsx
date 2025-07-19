// Styling
import './GameInformationSearchForm.css';

// Framework dependencies
import {useForm} from "react-hook-form";

// Components
import SelectFormControl from "../../form-controls/SelectFormControl/SelectFormControl.jsx";
import SearchFormControl from "../../form-controls/SearchFormControl/SearchFormControl.jsx";

function GameInformationSearchForm({onSubmit}) {
  const {
    handleSubmit,
    register,
    formState: {errors}
  } = useForm({
    defaultValues: {
      gameInformationType: null,
      gameInformationSearchTerm: null
    }
  });

  return (
    <form
      className="game-information-search-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="game-information-search-form__type">
        <SelectFormControl
          id="game-information-type"
          name="gameInformationType"
          label="Type"
          placeholder="Selecteer type"
          register={register}
          error={errors.gameInformationType}
          options={[
            {value: "weapons", label: "Wapens"},
            {value: "monsters", label: "Monsters"}
          ]}
          validationRules={{
            required: true
          }}
        />
      </div>

      <div className="game-information-search-form__search-term">
        <SearchFormControl
          id="game-information-search-term"
          name="gameInformationSearchTerm"
          label="Zoekopdracht"
          register={register}
          error={errors.gameInformationSearchTerm}
          validationRules={{
            minimumLength: 0,
            maximumLength: 50
          }}
          onSearch={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}

export default GameInformationSearchForm;