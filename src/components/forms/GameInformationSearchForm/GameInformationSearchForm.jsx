// Styling
import './GameInformationSearchForm.css';

// Framework dependencies
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';

// Components
import SelectFormControl from '@components/form-controls/SelectFormControl/SelectFormControl.jsx';
import SearchFormControl from '@components/form-controls/SearchFormControl/SearchFormControl.jsx';

function GameInformationSearchForm({onSubmit, defaultValues = {}}) {
  const {type, searchTerm} = defaultValues

  const {
    handleSubmit,
    register,
    formState: {errors},
    reset
  } = useForm({
    defaultValues: {
      gameInformationType: type,
      gameInformationSearchTerm: searchTerm
    }
  });

  useEffect(() => {
    reset({
      gameInformationType: type,
      gameInformationSearchTerm: searchTerm
    })
  }, [defaultValues]);

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