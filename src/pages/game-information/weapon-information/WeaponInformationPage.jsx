// Styling
import './WeaponInformationPage.css';

// Framework dependencies
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

// Custom hooks
import useRequestState from '@hooks/useRequestState.js';

// Services
import weaponInformationService from '@services/weaponInformationService.js';

// Helpers and constants
import currencyMap from '@constants/currencyMap.js';

// Components
import Panel from '@components/ui/Panel/Panel.jsx';
import Spinner from '@components/ui/Spinner/Spinner.jsx';

function WeaponInformationPage() {
  const params = useParams();

  const {data: weapon, loading, executeRequest} = useRequestState(
    weaponInformationService.getWeaponInformationByIndex(params.id, {useCache: true}),
    {executeOnMount: false, isAbortable: true}
  );

  useEffect(() => {
    if (params.id) {
      executeRequest();
    }
  }, [params.id]);

  return (
    <div className="weapon-information">
      <Panel title={weapon && weapon.name}>
        {loading && (
          <div className="weapon-information__loading">
            <Spinner size="large"/>
          </div>
        )}

        {!loading && weapon && (<>
          <div className="weapon-information__row">
            <dl className="weapon-information__column">
              {(weapon.damage || weapon['two_handed_damage']) && (
                <div className="weapon-information__damage">
                  <dt>Damage</dt>
                  <dd>
                    {weapon.damage && (
                      <span>{weapon.damage['damage_dice']} ({weapon.damage['damage_type'].name})</span>
                    )}

                    {weapon['two_handed_damage'] && (
                      <span>
                      {weapon['two_handed_damage']['damage_dice']} ({weapon['two_handed_damage']['damage_type'].name})
                      (2h)
                    </span>
                    )}
                  </dd>
                </div>
              )}

              {weapon.range && (
                <div>
                  <dt>Bereik</dt>
                  <dd>{weapon.range.normal}ft{weapon.range.long ? ` / ${weapon.range.long}ft` : ''}</dd>
                </div>
              )}

              {weapon['throw_range'] && (
                <div>
                  <dt>Werpbereik</dt>
                  <dd>{weapon['throw_range'].normal}ft / {weapon['throw_range'].long}ft</dd>
                </div>
              )}
            </dl>

            <dl className="weapon-information__column">
              {weapon['category_range'] && (
                <div>
                  <dt>Wapen categorie</dt>
                  <dd>{weapon['category_range']}</dd>
                </div>
              )}

              {weapon.properties && weapon.properties.length > 0 && (
                <div>
                  <dt>Eigenschappen</dt>
                  <dd>
                    <ul>
                      {weapon.properties.map(property =>
                        <li key={property.name}>{property.name}</li>
                      )}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="weapon-information__footer-row">
            <dl className="weapon-information__row">
              {(weapon.weight || weapon.weight === 0) && (
                <div>
                  <dt>Gewicht</dt>
                  <dd>{weapon.weight} lbs</dd>
                </div>
              )}

              {weapon.cost && (
                <div className="weapon-information__cost">
                  <dt>Waarde</dt>
                  <dd>
                    <span>{weapon.cost.quantity}</span>
                    <span className="weapon-information__cost-image">
                    <img src={currencyMap.find(currency => currency.id === weapon.cost.unit).icon}/>
                  </span>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </>)}
      </Panel>
    </div>
  );
}

export default WeaponInformationPage;