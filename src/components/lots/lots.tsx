import '../card-result/card-result.styles.css';

export interface LotsProps {
  items: {
    Id: number;
    IMEI: string;
  }[];
}

export function Lots({ items }: LotsProps) {
  if (items.length === 0) {
    return (
      <div className="card">
        <div className="cardBody">
          <p>Value:</p> No items found
        </div>
      </div>
    );
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li className="card" key={index}>
          IMEI: {item?.IMEI}
        </li>
      ))}
    </ul>
  );
}
