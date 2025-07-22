// Styling
import './MonsterInformationPage.css';

// Framework dependencies
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

// Custom hooks
import useRequestState from '@hooks/useRequestState.js';

// Services
import monsterInformationService from '@services/monsterInformationService.js';

// Helpers
import {firstCharacterToUpperCase} from '@helpers/formatCaseHelpers.js';

// Components
import Panel from '@components/ui/Panel/Panel.jsx';
import Spinner from '@components/ui/Spinner/Spinner.jsx';
import CharacterAbility from '@components/ui/CharacterAbility/CharacterAbility.jsx';

function MonsterInformationPage() {
  const params = useParams();

  const {data: monster, loading, executeRequest} = useRequestState(
    monsterInformationService.getMonsterInformationByIndex(params.id, {useCache: true}),
    {executeOnMount: false, isAbortable: true}
  );

  useEffect(() => {
    if (params.id) {
      executeRequest();
    }
  }, [params.id]);

  return (
    <div className="monster-information">
      <Panel title={monster && monster.name}>
        {loading && (
          <div className="monster-information__loading">
            <Spinner size="large"/>
          </div>
        )}

        {!loading && monster && (
          <div className="monster-information__content">
            {monster.desc && (
              <p><em>{monster.desc}</em></p>
            )}

            <div className="monster-information__row">
              <dl className="monster-information__column">
                {monster['hit_points'] && (
                  <div>
                    <dt>Hit points</dt>
                    <dd>{monster['hit_points']}</dd>
                  </div>
                )}

                {monster['armor_class'] && (
                  <div>
                    <dt>Armor class</dt>
                    <dd>{monster['armor_class'][0].value}</dd>
                  </div>
                )}

                {monster.speed && (
                  <div className="monster-information__speed">
                    <dt>Speed</dt>
                    <dd>
                      {Object.entries(monster.speed)
                        .map(([key, value]) => `${value} (${key})`)
                        .join('\n')}
                    </dd>
                  </div>
                )}
              </dl>

              <dl className="monster-information__column">
                {monster.type && (
                  <div>
                    <dt>Type</dt>
                    <dd>
                      {firstCharacterToUpperCase(monster.type)}
                      {monster.subtype && ` (${firstCharacterToUpperCase(monster.subtype)})`}
                    </dd>
                  </div>
                )}

                {monster.alignment && (
                  <div>
                    <dt>Alignment</dt>
                    <dd>{firstCharacterToUpperCase(monster.alignment)}</dd>
                  </div>
                )}
              </dl>

              <dl className="monster-information__column">
                {(monster['damage_vulnerabilities'] && monster['damage_vulnerabilities'].length > 0) && (
                  <div>
                    <dt>Zwak tegen</dt>
                    <dd>
                      {monster['damage_vulnerabilities']
                        .map(value => firstCharacterToUpperCase(value))
                        .join(', ')}
                    </dd>
                  </div>
                )}

                {(monster['damage_resistances'] && monster['damage_resistances'].length > 0) && (
                  <div>
                    <dt>Resistent tegen</dt>
                    <dd>
                      {monster['damage_resistances']
                        .map(value => firstCharacterToUpperCase(value))
                        .join(', ')}
                    </dd>
                  </div>
                )}
              </dl>

              <dl className="monster-information__column">
                {(monster['damage_immunities'] && monster['damage_immunities'].length > 0) && (
                  <div>
                    <dt>Schade immuniteit(en)</dt>
                    <dd>
                      {monster['damage_immunities']
                        .map(value => firstCharacterToUpperCase(value))
                        .join(', ')}
                    </dd>
                  </div>
                )}

                {(monster['condition_immunities'] && monster['condition_immunities'].length > 0) && (
                  <div>
                    <dt>Condition immuniteit(en)</dt>
                    <dd>
                      {monster['condition_immunities']
                        .map(value => firstCharacterToUpperCase(value.name))
                        .join(', ')}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="monster-information__row">
              <dl className="monster-information__column">
                <div className="monster-information__row monster-information__abilities-row">
                  <CharacterAbility label="Charisma" value={monster.charisma}/>
                  <CharacterAbility label="Constitution" value={monster.constitution}/>
                  <CharacterAbility label="Dexterity" value={monster.dexterity}/>
                </div>

                <div className="monster-information__row monster-information__abilities-row">
                  <CharacterAbility label="Intelligence" value={monster.intelligence}/>
                  <CharacterAbility label="Strength" value={monster.strength}/>
                  <CharacterAbility label="Wisdom" value={monster.wisdom}/>
                </div>
              </dl>
            </div>

            <dl className="monster-information__row monster-information__footer-row">
              {(monster['challenge_rating'] || monster['challenge_rating'] === 0) && (
                <div>
                  <dt>Challenge rating</dt>
                  <dd>{monster['challenge_rating']}</dd>
                </div>
              )}

              {monster.xp && (
                <div>
                  <dt>Experience points</dt>
                  <dd>{monster.xp}</dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </Panel>
    </div>
  );
}

export default MonsterInformationPage;