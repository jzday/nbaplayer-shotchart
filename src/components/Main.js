import React from 'react';
import nba from 'nba';
import {Profile} from "./Profile";
import {DataViewContainer} from "./DataViewContainer";
import {SearchBar} from "./SearchBar";
import {DEFAULT_PLAYER_INFO} from "../constants";

export class Main extends React.Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.playerName);
    }

    loadPlayerInfo = (playerName) => {
        const playerId = nba.findPlayer(playerName).playerId;
        nba.stats.playerInfo({PlayerID: playerId}).then((info) => {

            //playerInfo 相当于把几个数据整合成一个数据了
            const playerInfo = Object.assign(
                info.commonPlayerInfo[0], info.playerHeadlineStats[0]
            );

            this.setState({
                playerInfo: playerInfo,
            });
        });
    }

    render() {
        console.log(this.state.playerInfo);
        return (
            <div className="main">
                <SearchBar loadPlayerInfo = {this.loadPlayerInfo}/>
                <div className= "player">
                <Profile playerId={this.state.playerId}
                         playerInfo={this.state.playerInfo}/>
                <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        )
    }
}