
import { MainService } from '../services/main_service.js';
const mainService = new MainService();

const resolvers = {
    ImageQuality: {
        High: "high",
        Medium: "medium",
        Low: "low",
    },
    Pagination: {
        __resolveType(_, __, ___) {
            return null;
        },
    },
    Query: {
        async getWallpapers(_, args) {
            return await mainService.getWallpapers(args);
        },
        async getSoundTracks(_, args) {
            return await mainService.getSoundTracks(args);
        }
    },
};

export default resolvers;