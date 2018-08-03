import React, { Component } from 'react';
import SequencedTitle from './title';
import styled from 'styled-components';
import ContentFader from './content-fader';

const Header = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #FFF;
  padding: 30px;
`;

const HeaderButtons = styled.div`
  display: flex;
  justify-content: center;
  >* {
    margin: 0 1rem;
  }
`;

const Main = styled.main`
  max-width: 1000px;
  margin: 0px auto;
  padding: 100px 50px;
`;

const Intro = styled.p`
  margin: 40px 0;
`;

const Section = styled.div`
  margin-bottom: 50px;
`;

const CodeEmbed = styled.iframe`
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 4px;
`;

class App extends Component {
  render() {
    return (
      <div>
        <Header>
          {/*<SequencedTitle/>*/}
          <Intro>The smarter way to perform complex animations and transitions in React.</Intro>
          <HeaderButtons>
            <a className="github-button" href="https://github.com/amized/react-sequencer" data-icon="octicon-star" data-size="large" aria-label="Star ntkme/github-buttons on GitHub">Star</a>
            <a className="github-button" href="https://github.com/amized/react-sequencer/fork" data-icon="octicon-repo-forked" data-size="large" aria-label="Fork ntkme/github-buttons on GitHub">Fork</a>
          </HeaderButtons>
        </Header>
        <Main>
          <ContentFader/>
          <Section>
            <h2>withSequencer</h2>
            <p>
              withSequencer is a higher order component that injects the sequencer state. Your component will receive a sequencer object as a prop that contains the sequencer state and some methods to control the sequencer.
            </p>
            <h3>Example</h3>
            <CodeEmbed
              src="https://codesandbox.io/embed/00lrywkjnn?fontsize=12"
              sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"/>
          </Section>
          <Section>
            <h2>{`<Transition>`}</h2>
            <p>
              Transition is a wrapper component to help make in/out transitions easy to manage. The concept is losely based off the React Transition Group {`<Transition>`}, but uses Sequencers as the engine, giving you
              the freedom to phase through any number of steps in your transitions, and to render your sequencer state in any way you choose.
            </p>
            <h3>Example</h3>
            <CodeEmbed
              src="https://codesandbox.io/embed/zww9jxp4pm?fontsize=12"
              sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"/>
          </Section>
        </Main>
      </div>
    );
  }
}

export default App;
