export default function randomCard(num) {
  const arr = [];
  
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);

    if (imageUrls[randomIndex].selected) {
      i--; // retry
      continue;
    }

    imageUrls[randomIndex].selected = true; // mark as used
    arr.push(imageUrls[randomIndex].url);
  }

  return arr;
}

const imageUrls = [
  {url: "https://images.ygoprodeck.com/images/cards_small/10000020.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/10000000.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/10000010.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/46986414.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/38033121.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/78193831.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/73752131.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/25652259.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/64788463.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/90876561.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/77207191.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/5818798.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/71413901.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/75347539.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/99785935.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/39256679.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/11549357.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/52077741.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/34710660.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/40640057.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/30208479.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/99789342.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/67227834.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/63391643.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/72302403.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/66788016.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/27847700.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/1784686.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/55144522.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/79571449.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/24874630.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/40703222.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/95286165.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/5318639.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/76792184.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/44095762.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/9287078.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/32754886.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/62279055.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/37383714.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/6150044.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/6150045.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/98502114.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/4796100.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/75380687.jpg", selected: false},
  {url: "https://images.ygoprodeck.com/images/cards_small/43892408.jpg", selected: false}
];
