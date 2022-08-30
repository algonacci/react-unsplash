import React, { Component } from "react";
import axios from "axios";
import Image from "./Image";
import InfiniteScroll from "react-infinite-scroll-component";

class Images extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
      count: 30,
      start: 1,
    };
    this.fetchImages = this.fetchImages.bind(this);
  }

  componentDidMount() {
    const API_KEY = "Ax841D0HyUjj7YfQVAVnmubjDyeX6j_31AHR76J95lE";
    const { count, start } = this.state;

    axios
      .get(
        `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`
      )
      .then((res) => {
        this.setState({
          images: res.data,
          start: start + count,
        });
      });
  }

  fetchImages() {
    const API_KEY = "Ax841D0HyUjj7YfQVAVnmubjDyeX6j_31AHR76J95lE";
    const { images, count, start } = this.state;

    this.setState({
      start: start + count,
    });

    axios
      .get(
        `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`
      )
      .then((res) => {
        this.setState({
          images: images.concat(res.data),
        });
      });
  }

  render() {
    const { images } = this.state;
    return (
      <InfiniteScroll
        dataLength={images.length}
        next={this.fetchImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {images.map((image) => (
          <Image key={image.id} image={image} />
        ))}
      </InfiniteScroll>
    );
  }
}

export default Images;
