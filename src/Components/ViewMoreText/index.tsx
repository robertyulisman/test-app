import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fullTextWrapper: {
    opacity: 0,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  viewMoreText: {
    color: 'blue',
  },
  transparent: {
    opacity: 0,
  },
});

class ViewMoreText extends React.Component<any, any> {
  
  private trimmedTextHeight = null;
  private fullTextHeight = null;
  private shouldShowMore = false;

  static defaultProps = {
    afterCollapse: () => {},
    afterExpand: () => {},
    textStyle: {},
  };

  public constructor(props: any){
    super(props);
    this.state = {
      isFulltextShown: true,
      numberOfLines: this.props.numberOfLines,
    }
  }

  hideFullText = () => {
    if (this.state.isFulltextShown && this.trimmedTextHeight && this.fullTextHeight) {
      this.shouldShowMore = this.trimmedTextHeight < this.fullTextHeight;
      this.setState({
        isFulltextShown: false,
      });
    }
  };

  onLayoutTrimmedText = (event: any) => {
    const { height } = event.nativeEvent.layout;

    this.trimmedTextHeight = height;
    this.hideFullText();
  };

  onLayoutFullText = (event: any) => {
    const { height } = event.nativeEvent.layout;

    this.fullTextHeight = height;
    this.hideFullText();
  };

  onPressMore = () => {
    this.setState(
      {
        numberOfLines: null,
      },
      () => {
        this.props.afterExpand();
      },
    );
  };

  onPressLess = () => {
    this.setState(
      {
        numberOfLines: this.props.numberOfLines,
      },
      () => {
        this.props.afterCollapse();
      },
    );
  };

  getWrapperStyle = () => {
    if (this.state.isFulltextShown) {
      return styles.transparent;
    }
    return {};
  };

  renderViewMore = () => (
    <Text style={styles.viewMoreText} onPress={this.onPressMore}>
      View More
    </Text>
  );

  renderViewLess = () => (
    <Text style={styles.viewMoreText} onPress={this.onPressLess}>
      View Less
    </Text>
  );

  renderFooter = () => {
    const { numberOfLines } = this.state;

    if (this.shouldShowMore === true) {
      if (numberOfLines > 0) {
        return (this.props.renderViewMore || this.renderViewMore)(this.onPressMore);
      }
      return (this.props.renderViewLess || this.renderViewLess)(this.onPressLess);
    }
    return null;
  };

  renderFullText = () => {
    if (this.state.isFulltextShown) {
      return (
        <View onLayout={this.onLayoutFullText} style={styles.fullTextWrapper}>
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <View style={this.getWrapperStyle()}>
        <View onLayout={this.onLayoutTrimmedText}>
          <Text style={this.props.textStyle} numberOfLines={this.state.numberOfLines}>
            {this.props.children}
          </Text>
          {this.renderFooter()}
        </View>

        {this.renderFullText()}
      </View>
    );
  }
}


export default ViewMoreText;
