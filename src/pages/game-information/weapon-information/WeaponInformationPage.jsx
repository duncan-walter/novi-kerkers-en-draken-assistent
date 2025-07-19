// Styling
import './WeaponInformationPage.css';

// Framework dependencies
import {useEffect} from "react";
import {useParams} from "react-router-dom";

// Custom hooks
import useRequestState from "../../../hooks/useRequestState.js";

// Services
import weaponInformationService from "../../../services/weaponInformationService.js";

// Components
import Panel from "../../../components/ui/Panel/Panel.jsx";
import Spinner from "../../../components/ui/Spinner/Spinner.jsx";

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
          <Spinner size="large"/>
        )}

        {!loading && weapon && (<>
          <div className="weapon-information__row">
            <dl className="weapon-information__column">
              <div>
                <dt>Damage</dt>
                <dd>
                  <div>{weapon.damage['damage_dice']} ({weapon.damage['damage_type'].name})</div>

                  {weapon['two_handed_damage'] && (
                    <div>
                      {weapon['two_handed_damage']['damage_dice']} ({weapon['two_handed_damage']['damage_type'].name}) (2h)
                    </div>
                  )}
                </dd>
              </div>

              <div>
                <dt>Bereik</dt>
                <dd>{weapon.range.normal}ft{weapon.range.long ? ` / ${weapon.range.long}ft` : ''}</dd>
              </div>

              {weapon['throw_range'] && (
                <div>
                  <dt>Gooi bereik</dt>
                  <dd>{weapon['throw_range'].normal}/{weapon['throw_range'].long}</dd>
                </div>
              )}
            </dl>

            <dl className="weapon-information__column">
              <div>
                <dt>Wapen categorie</dt>
                <dd>{weapon['category_range']}</dd>
              </div>

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
            </dl>
          </div>

          <dl className="weapon-information__row-end">
            <div>
              <dt>Waarde</dt>
              <dd>{weapon.cost.quantity}{weapon.cost.unit}</dd>
            </div>
          </dl>
        </>)}
      </Panel>
    </div>
  );
}

export default WeaponInformationPage;