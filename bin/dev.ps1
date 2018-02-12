docker pull dshaneg/nodejs:8-alpine

docker run `
  --rm `
  -it `
  -w=/app `
  --name adv-dev `
  --mount type=bind,source="$(Get-Location)",target=/app `
  dshaneg/nodejs:8-alpine `
  /bin/bash
