import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import BottomMenu from "./Header/BottomMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center",
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "10px",
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
  },
  input: {
    display: "none",
  },
}));

function Scan() {
  const classes = useStyles();
  const [source, setSource] = useState("");
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
        console.log(newUrl);
      }
    }
  };

  return (
    <div className={classes.root}>

        <div className="ladeheader text-white w-100 d-flex fw-bold">
          <div className="ladekitchen mt-3 w-75 text-center ps-5 ms-3 ms-xl-5">
            <p>Scan</p>
          </div>
        </div>

        <Grid container>
          <Grid item xs={12}>
            <h5>Capture your image</h5>
            {source && (
              <Box
                display="flex"
                justifyContent="center"
                border={1}
                className={classes.imgBox}
              >
                <img src={source} alt={"snap"} className={classes.img}></img>
              </Box>
            )}
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              capture="environment"
              onChange={(e) => handleCapture(e.target)}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCameraRoundedIcon fontSize="large" color="primary" />
              </IconButton>
            </label>
            <button><a href={source}></a>Download</button>
          </Grid>
        </Grid>
        <BottomMenu />
      </div>
      );
}
      export default Scan;

















// import React, { Component } from 'react'
// import BottomMenu from "./Header/BottomMenu";
// import QrReader from 'react-qr-scanner'
// class Scan extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       result: 'Hold QR Code Steady And Scan',
//     }
//     this.handleScan = this.handleScan.bind(this);
//   }
//   handleScan(data) {
//     this.setState({
//       result: data
//     })
//   }
//   handleError(error) {
//     console.log(error);
//   }
//   render() {
//     const previewStyle = {
//       display: 'flex',
//       justifyContent: "center"
//     }
//     const camStyle = {
//       display: 'flex',
//       justifyContent: "center",
//       marginTop: '-50px'
//     }
//     const textStyle = {
//       fontSize: '20px',
//       textAlign: 'center',
//       marginTop: '-50px'
//     }
//     return (
//       <div className="scanMain  vh-100  text-white">
//         <p className="text-center fw-bold pt-4">Scan</p>

//         <React.Fragment>
//           <div style={camStyle}>
//             <QrReader
//               delay={100}
//               style={previewStyle}
//               onError={this.handleError}
//               onScan={this.handleScan}
//             />
//           </div>
//           <p style={textStyle}>
//             {this.state.result}
//           </p>
//         </React.Fragment>
//         <BottomMenu />
//       </div>
//     )
//   }
// }
// export default Scan