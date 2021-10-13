
import CardAction from './components/CardAction';
import CardContainer from './components/CardContainer';
import CardHeader from './components/CardHeader';

import './App.scss';
import  AppCustomHook  from './appCustomHook';

const appTitle = "Heartburn Checker";

function App() {
  const {
    actualContent,
    handleBack,
    handleRecordChoice,
    handleContentAction,
    isFirstQuestion,
    nextQuestionIsAvailable,
    questionChoice,
    tracker,
  } = AppCustomHook();

  

  return (
    <div className="checker" data-testid='component-app'>
      <CardHeader 
        title={appTitle} 
        tracker={tracker} 
        handleBack={handleBack}
        actionIsDisabled={isFirstQuestion}
      />
      <CardContainer {...
        {
          ...actualContent, 
          setHistory: handleRecordChoice,
          selectedAnswer: questionChoice.answer || ''
        }}/>
      <CardAction 
        isDisabled={!nextQuestionIsAvailable} 
        clickHandle={handleContentAction}
        restart={ 'show_booking_button' in actualContent }
      />
    </div>
  );
}

export default App;
