import BaseCard from "./BaseCard";

export interface GalleryCardTile {
  id: string;
  position: string;
  imageLabel: string;
  title: string;
  aspectRatio: string;
}

export interface GalleryCardProps {
  titleLineOne: string;
  titleLineTwo: string;
  description: string;
  tiles: readonly GalleryCardTile[];
}

export default function GalleryCard({
  titleLineOne,
  titleLineTwo,
  description,
  tiles,
}: GalleryCardProps) {
  return (
    <BaseCard className="card-gallery">
      <header>
        <h2>
          {titleLineOne}
          <br />
          {titleLineTwo}
        </h2>
        <p className="desc">{description}</p>
      </header>
      <div className="grid">
        {tiles.map((tile) => (
          <div className={`tile ${tile.position}`} key={tile.id}>
            <div className="fill" />
            <span className="mono lbl">{tile.imageLabel}</span>
            <div className="cap">
              <b>{tile.title}</b>
              <span>{tile.aspectRatio}</span>
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
}
