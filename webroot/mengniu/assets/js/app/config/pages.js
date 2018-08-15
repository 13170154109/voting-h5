define([
        "controllers/pages/home",
        "controllers/pages/loading",
        "controllers/pages/voting",
        "controllers/pages/contestants-list",
        "controllers/pages/voting-info",
        "controllers/pages/share-vote",

    ],


    function (Home,Loading,Voting,ContestantsList,VotingInfo,ShareVote) {

        var pages = [
            {
                routeId: 'home',
                type: 'main',
                landing: false,
                page: function () {
                    return new Home.View({template: "pages/home"});
                }
            },

            //Loading
            {
                routeId: 'loading',
                type: 'main',
                landing: true,
                page: function () {
                    return new Loading.View({template: "pages/loading"});
                }
            },

            //voting
            {
                routeId:'voting',
                type: 'main',
                landing: false,
                page: function () {
                    return new Voting.View({template: "pages/voting"});
                }
            },
            //voting-list
            {
                routeId:'contestants-list',
                type: 'main',
                landing: false,
                page: function () {
                    return new ContestantsList.View({template: "pages/contestants-list"});
                }
            },
            //VotingInfo
            {
                routeId:'voting-info',
                type: 'main',
                landing: false,
                page: function () {
                    return new VotingInfo.View({template: "pages/voting-info"});
                }
            },
            //Share
            {
                routeId:'share-vote',
                type: 'main',
                landing: false,
                page: function () {
                    return new ShareVote.View({template: "pages/share-vote"});
                }
            },

        ];


        return pages;

    });
