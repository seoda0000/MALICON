import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./DialogExtension.css";

// 타입 생성
interface DialogProps {
  cancelClicked: any;
  showDialog: any;
}

interface StateType {
  isInstalled: boolean;
}

// DialogExtensionComponent
export default class DialogExtensionComponent extends Component<
  DialogProps,
  {}
> {
  // ChatComponent class 타입 정의
  // =======================================================

  openviduExtensionUrl: string;
  state: StateType;

  // =======================================================

  constructor(props: DialogProps) {
    super(props);
    this.openviduExtensionUrl =
      "https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold";
    //isInstalled: boolean;

    this.state = {
      isInstalled: false,
    };
    this.goToChromePage = this.goToChromePage.bind(this);
    this.onNoClick = this.onNoClick.bind(this);
    this.refreshBrowser = this.refreshBrowser.bind(this);
  }

  componentWillReceiveProps(props: any) {}

  componentDidMount() {}

  onNoClick() {
    // this.cancel.emit();
    this.props.cancelClicked();
  }

  goToChromePage() {
    window.open(this.openviduExtensionUrl);
    this.setState({ isInstalled: true });
  }

  refreshBrowser() {
    window.location.reload();
  }

  render() {
    return (
      <div>
        {this.props && this.props.showDialog ? (
          <div id="dialogExtension">
            <Card id="card">
              <CardContent>
                <Typography color="textSecondary">Hello</Typography>
                <Typography color="textSecondary">
                  You need install this chrome extension and refresh the browser
                  for can share your screen.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={this.onNoClick}>
                  Cancel
                </Button>

                <Button size="small" onClick={this.goToChromePage}>
                  Install
                </Button>
                {this.state.isInstalled ? (
                  <Button size="small" onClick={this.refreshBrowser}>
                    Refresh
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          </div>
        ) : null}
      </div>
    );
  }
}
