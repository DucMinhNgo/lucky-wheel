import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import WheelBoard from '../components/Home/WheelBoard';
import WheelButton from '../components/Home/WheelButton';
import './Roulette.css';

const Roulette: React.FC = () => {
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Roulette</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Roulette 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <WheelBoard />
      </IonContent>
    </IonPage>
  )
}

export default Roulette;