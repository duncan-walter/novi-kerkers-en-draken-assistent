// Styling
import './CharacterConditionsFormControl.css';

// Custom hooks
import useRequestState from '@hooks/useRequestState.js';

// Services
import characterConditionsService from '@services/characterConditionsService.js';

// Components
import Spinner from '@components/ui/Spinner/Spinner.jsx';
import ConditionBadge from '@components/ui/ConditionBadge/ConditionBadge.jsx';

// TODO: This component can be extended to include the rendering of the readonly variant too.
function CharacterConditionsFormControl({characterId, currentConditions, onChange}) {
  const {data: conditionsFromAPI, loading: conditionsLoading} = useRequestState(
    characterConditionsService.getConditionsIndex({useCache: true}),
    {executeOnMount: true, isAbortable: true}
  );

  const availableCharacterConditions = () => {
    if (!conditionsFromAPI || conditionsLoading) {
      return [];
    }

    return conditionsFromAPI.results.filter(conditionFromAPI => !currentConditions.includes(conditionFromAPI.name));
  }

  const handleConditionChange = (condition, action) => {
    if (!['add', 'remove'].includes(action)) {
      return
    }

    const updatedConditions = action === 'add'
      ? [...currentConditions, condition]
      : currentConditions.filter(c => c !== condition);

    onChange(updatedConditions);
  };

  return (
    <div className="character-conditions-form-control">
      {conditionsLoading && <Spinner size='large'/>}
      {!conditionsLoading && (<>
        <section>
          <h3>Huidige conditions:</h3>
          <div className="character-conditions-form-control__conditions">
            {currentConditions.map(condition => (
              <ConditionBadge
                key={`${characterId}.${condition}`}
                label={condition}
                onClick={() => handleConditionChange(condition, 'remove')}
              />
            ))}
          </div>
        </section>

        <section>
          <h3>Beschikbare conditions:</h3>
          <div className="character-conditions-form-control__conditions">
            {availableCharacterConditions().map(condition => (
              <ConditionBadge
                key={`${characterId}.${condition.name}`}
                label={condition.name}
                onClick={() => handleConditionChange(condition.name, 'add')}
              />
            ))}
          </div>
        </section>

        <p>
          Klik op een condition om te (de)selecteren.
        </p>
      </>)}
    </div>
  );
}

export default CharacterConditionsFormControl;