import React, { Component } from 'react';
import Downshift from 'downshift';
import axios from 'axios';
import debounce from 'lodash.debounce';
import searchBoxIcon from '../images/search.png';
const inputStyles = {
  width: '410px',
  height: '40px',
  borderRadius: '2px',
  border: 'none',
  backgroundColor: 'white',
  padding: '5px 8px',
  fontSize: '15px',
  fontWeight: '500',
  marginTop: '11px'
};

const dropdownStyles = highLighted => {
  return {
    borderBottom: '1px solid wheat',
    backgroundColor: highLighted ? '#f7f7f7' : 'white',
    padding: '6px',
    transition: 'all 0.2s',
    paddingLeft: highLighted ? '3px' : '0',
    borderLeft: `10px solid ${highLighted ? 'wheat' : 'white'}`,
    maxWidth: '410px'
  };
};
class SearchBox extends Component {
  state = {
    posts: [],
    isLoading: false
  };

  onInputChange = debounce(async ({ target: { value } }) => {
    if (value.length > 3) {
      this.setState({ isLoading: true });
      const {
        data: { result }
      } = await axios.get(`http://` + process.env.REACT_APP_API_HOST + `/searchposts?text=${value}`);
      this.setState({ posts: result, isLoading: false });
    }
  }, 500);

  render() {
    return (
      <Downshift
        onChange={selection => alert(`you selected ${selection}`)}
        itemToString={item => (item ? item.content : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <input
              {...getInputProps({
                onChange: e => {
                  e.persist();
                  this.onInputChange(e);
                },
                placeholder: 'Search posts'
              })}
              id="search_text"
              style={inputStyles}
            />
            <img
              src={searchBoxIcon}
              alt="searchbox Icon"
              onClick={this.props.searchHandler}
              style={{
                marginTop: '10px',
                paddingTop: '4px',
                position: 'relative',
                top: '7px',
                right: '39px'
              }}
            />
            {isOpen &&
              this.state.posts.map((post, index) => (
                <p
                  {...getItemProps({ key: index, index, item: post })}
                  style={dropdownStyles(highlightedIndex === index)}
                >
                  {post.content}{' '}
                </p>
              ))}
          </div>
        )}
      </Downshift>
    );
  }
}

export default SearchBox;
