import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const opts = { toJSON: { virtuals: true } };

const ArtistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    avatar: {
      type: {
        id: String,
        url: String,
        thump1: String,
        thump2: String,
        blurHash: String,
      },
      require: true,
    },
    socialProfile: {
      type: [
        {
          type: {
            type: String,
          },
          profileId: String,
        },
      ],
    },
  },
  opts
);
ArtistSchema.plugin(mongoosePaginate);
ArtistSchema.plugin(aggregatePaginate);

const Artist = mongoose.model("artists", ArtistSchema);

export { Artist };
