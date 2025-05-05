module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "git clone https://github.com/cocktailpeanut/vid2densepose app"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git clone https://github.com/facebookresearch/detectron2.git"
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          xformers: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r ../requirements.txt",
          "uv pip install -e detectron2/projects/DensePose"
        ]
      }
    }
  ]
}
