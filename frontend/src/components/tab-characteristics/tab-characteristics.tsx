import { Guitar } from '../../types/guitar';

type TabCharacteristicsProps = {
  guitar: Guitar;
}

function TabCharacteristics({ guitar }: TabCharacteristicsProps): JSX.Element {

  return (
    <div className="tabs__content" id="characteristics">
      <table className="tabs__table">
        <tr className="tabs__table-row">
          <td className="tabs__title">Артикул:</td>
          <td className="tabs__value">{guitar.articleNumber}</td>
        </tr>
        <tr className="tabs__table-row">
          <td className="tabs__title">Тип:</td>
          <td className="tabs__value">{guitar.guitarType}</td>
        </tr>
        <tr className="tabs__table-row">
          <td className="tabs__title">Количество струн:</td>
          <td className="tabs__value">{`${guitar.stringAmount} струнная`}</td>
        </tr>
      </table>
    </div>
  );
}

export default TabCharacteristics;
