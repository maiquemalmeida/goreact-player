import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlaylistsActions } from '../../store/ducks/playlists';

import { Container, Title, List, Playlist } from './styles';

class Browse extends Component {
  static propTypes = {
    getPlaylistsRequest: PropTypes.func.isRequired,
    playlists: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          thumbnail: PropTypes.string,
          description: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  componentDidMount() {
    console.tron.log('Obtendo playlists');
    this.props.getPlaylistsRequest();
  }

  render() {
    return (
      <Container>
        <Title>Navegar</Title>
        <List>
          {this.props.playlists.data.map(playlist => (
            <Playlist to={`playlists/${playlist.id}`} key={playlist.id}>
              <img src={playlist.thumbnail} alt={playlist.title} />
              <strong>{playlist.title}</strong>
              <p>{playlist.description}</p>
            </Playlist>
          ))}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Browse);
