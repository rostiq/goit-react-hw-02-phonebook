import React, { Component } from "react";

import Section from "./Section/Section";
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Statistics from "./Statistics/Statistics";
import Notification from "./Notification/Notification";

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback() {
    const { good, neutral, bad } = this.state;
    return good+neutral+bad
  }

  countPositiveFeedbackPercentage() {
    const totalFeedback = this.countTotalFeedback();
    return Math.round((this.state.good * 100) / totalFeedback);
  }

  onLeaveFeedback = state => {
    this.setState(prevState => ({
      [state]: prevState[state] + 1,
    }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
              options={options}
              onLeaveFeedback={this.onLeaveFeedback}
          >
          </FeedbackOptions>
        </Section>
        <Section title="Statistic">
            {this.countTotalFeedback() ? (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={this.countTotalFeedback()}
                positivePercentage={this.countPositiveFeedbackPercentage()}
              >
              </Statistics>
            ) : (
              <Notification message="There is no feedback" />
            )}
          </Section>
      </>
    )
  }
}

export default App;
