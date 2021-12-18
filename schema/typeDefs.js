import { gql } from "apollo-server-express";
const typeDefs = gql` 
    scalar Date

    enum ImageQuality {
        High
        Medium
        Low
    }

    interface Pagination {
        hasPrevPage: Boolean
        hasNextPage: Boolean
        prevPage: Int
        nextPage: Int
        totalDocs: Int
     }
     
    type Wallpaper {
        id: ID
        url: String
        height: Int
        width: Int
        blurHash: String
        tag: [String]
    }

    type Wallpapers implements Pagination {
        docs: [Wallpaper]
        hasPrevPage: Boolean
        hasNextPage: Boolean
        prevPage: Int
        nextPage: Int
        totalDocs: Int
    }
    type Avatar {
        url: String
        thumb1: String
        thumb2: String
        blurHash: String
    }

    type SocialProfile {
        type: String
        profileId: String
    }
    type Artist {
        _id: ID
        name: String
        avatar: Avatar
        socialProfile: [SocialProfile]
        totalSong: Int
    }

    type Artists implements Pagination {
        docs: [Artist]
        hasPrevPage: Boolean
        hasNextPage: Boolean
        prevPage: Int
        nextPage: Int
        totalDocs: Int
    }

    type Cover {
        url: String
        format: String
    }

    type SoundTrack {
        id: ID
        url: String
        title: String
        cover: Cover
        format: String
        source: String
        artist: Artist
        createTime: Date
    }

    type SoundTracks implements Pagination {
        docs: [SoundTrack]
        hasPrevPage: Boolean
        hasNextPage: Boolean
        prevPage: Int
        nextPage: Int
        totalDocs: Int
    }
    type Query {
        getWallpapers(page: Int = 1, limit: Int = 10, quality: ImageQuality = High): Wallpapers,
        getSoundTracks(page: Int = 1, limit: Int = 10): SoundTracks

    }
`;

export default typeDefs;