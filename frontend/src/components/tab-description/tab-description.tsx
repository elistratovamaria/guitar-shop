import { Guitar } from '../../types/guitar';

type TabDescriptionProps = {
  guitar: Guitar;
}

function TabDescription({ guitar }: TabDescriptionProps): JSX.Element {

  return (
    <div className="tabs__content" id="description">
      <p className="tabs__product-description">{guitar.description}</p>
    </div>
  );
}

export default TabDescription;
