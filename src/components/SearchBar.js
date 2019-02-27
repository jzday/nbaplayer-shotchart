import React from 'react';
import { Icon, Input, AutoComplete } from 'antd';
import nba from 'nba';




export class  SearchBar extends React.Component{

    state = {
        dataSource: [],
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(
                ({fullName})=> fullName
            ),
        });
    }
     onSelect = (value) => {
        console.log('onSelect', value);
        this.props.loadPlayerInfo(value);
    }

    render(){
        const { dataSource } = this.state;
        return (
            <AutoComplete
                className = 'search-bar'
                dataSource={dataSource}
                size="large"
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Enter NBA player name"
            >
            <Input suffix={<Icon type="search"  />} />
        </AutoComplete>
        );
    }
}