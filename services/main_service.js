import mongoose from "mongoose";
import { Artist } from "../models/artist.js";
import { SoundTrack } from "../models/sound_track.js";
import { Wallpaper } from "../models/wallpapers.js";

export class MainService {
  constructor() { }

  async getWallpapers(args) {
    let { page, limit, quality } = args;
    const aggregate = Wallpaper.aggregate([
      {
        $unwind: "$url",
      },
      {
        $match: {
          "url.quality": quality.toLowerCase(),
        },
      },
      {
        $set: {
          url: "$url.url",
        },
      },
      { $addFields: { id: "$_id" } },
      { $project: { _id: 0 } },
    ]);
    return Wallpaper.aggregatePaginate(aggregate, {
      page: page,
      limit: limit,
    });
  }

  async getSoundTracks(args) {
    let { page, limit } = args;
    const aggregate = SoundTrack.aggregate([
      {
        $lookup: {
          from: "artists",
          localField: "artistId",
          foreignField: "_id",
          as: "artist",
        },
      },
      {
        $unwind: "$artist",
      },
      { $addFields: { id: "$_id" } },
      { $project: { _id: 0 } },
    ]);
    const result = await SoundTrack.aggregatePaginate(aggregate, {
      limit: limit,
      page: page,
    });
    console.log(result.docs[0]);
    return result;
  }

  async getArtists(args) {
    let { page, limit } = args;
    const aggregate = Artist.aggregate([
      {
        $lookup: {
          from: "soundtracks",
          let: { artistId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$artistId", "$$artistId"],
                },
              },
            },
          ],
          as: "soundtracks",
        },
      },
      { $addFields: { totalSong: { $size: "$soundtracks" } } },
      {
        $unset: "soundtracks",
      },
    ]);
    return await Artist.aggregatePaginate(aggregate, {
      page: page,
      limit: limit,
    });
  }

  async getArtistInfo(args) {
    let { id } = args;
    const toObjectId = new mongoose.Types.ObjectId(id);

    return Artist.findOne({ _id: toObjectId });
  }

  async getArtistPopularSong(args) {
    let { id } = args;
    const toObjectId = new mongoose.Types.ObjectId(id);
    return Artist.findOne({ _id: toObjectId });
  }

  async getArtistSoundTrack(args) {
    let { id, page, limit } = args;
    const toObjectId = new mongoose.Types.ObjectId(id);
    return SoundTrack.paginate(
      {
        artistId: toObjectId,
      },
      {
        limit: limit,
        page: page,
      }
    );
  }
}
