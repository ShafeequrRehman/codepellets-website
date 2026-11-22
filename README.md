# Codepellets Technologies — Website (React + Vite)

## Chalane ka tareeqa (VS Code)

1. Zip ko extract karein aur `codepellets-website` folder VS Code mein kholein.
2. Terminal kholein (Ctrl + `) aur likhein:

   ```bash
   npm install
   npm run dev
   ```

3. Terminal mein jo link aaye (aam tor par http://localhost:5173) usay browser mein kholein.

> Node.js 18 ya us se naya version chahiye.

## Text badalna

Saari likhai (Urdu aur English), phone number, addresses aur CEO ka naam
`src/content.js` mein hain. Sirf wahan badlein.

Website ab default **English** mein khulti hai. Navbar ka "اردو" button dabane se Urdu ho jati hai.
Default wapas Urdu karni ho to `src/App.jsx` mein `useState('en')` ko `useState('ur')` kar dein.

## Rang badalna

`src/index.css` ke shuru mein `--navy` aur `--accent` ke rang hain.

## Live karne ke liye build

```bash
npm run build
```

`dist` folder ban jayega — usay kisi bhi hosting (Netlify, Vercel, cPanel) par upload kar dein.
