import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Guitar } from '../../types/guitar';
import { Tab } from '../../const';
import TabCharacteristics from '../tab-characteristics/tab-characteristics';
import TabDescription from '../tab-description/tab-description';

type TabsListProps = {
  guitar: Guitar;
};

function TabsList({ guitar }: TabsListProps) {
  const [activeTab, setActiveTab] = useState<string>(Tab.Characteristics);

  const renderTab = () => {
    switch (activeTab) {
      case Tab.Characteristics:
        return <TabCharacteristics guitar={guitar} />;
      case Tab.Description:
        return <TabDescription guitar={guitar} />;
    }
  };

  return (
    <div className="tabs">
      <Link
        className={`button button--medium tabs__button ${activeTab === Tab.Characteristics ? '' : 'button--black-border'}`}
        to="#"
        onClick={() => setActiveTab(Tab.Characteristics)}
      >Характеристики
      </Link>
      <Link
        className={`button button--medium tabs__button ${activeTab === Tab.Description ? '' : 'button--black-border'}`}
        to="#"
        onClick={() => setActiveTab(Tab.Description)}
      >Описание
      </Link>
      {renderTab()}
    </div>
  );
}

export default TabsList;
