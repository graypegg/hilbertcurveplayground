# Hilbert Curves!

Hi Rarecircles!

Here's my submission. I wanted to try something with fractals. This renders weather data on a hilbert curve, which has the weird property of keeping points close together if the source data is sorted.

In these examples, the data comes sorted by date. So you can see these big macro blocks representing months/seasons move by, depending on which weather reading type you choose. Kinda cool!

Direct link if you just want to see it: https://graypegg.com/hilbert
(Repo should be easy to use, npm install, npm run dev)

## Somethings I would do if I had more time, and wasn't doing this on work days, after work:

- Tests, probably vitest. Mostly wasn't sure what I was making here until I made it, so sorry for no examples on that front.
- Better API, open-meteo is free, but it's a bit janky. Specifically the return type is annoying to set up guards for in TS. I would probably set up some better type guards with the `Param is Type` return type.

Thanks for looking at this! Hope to hear from you 🧡
