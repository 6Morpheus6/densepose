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
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        message: "mkdir C:\\TMP"
      }
    },
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        build: true,
        env: {
          TMPDIR: "C:\\TMP",
          DISTUTILS_USE_SDK: "1"
        },
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r ../requirements.txt",
          "pip install -e detectron2/projects/DensePose"
        ]
      }
    },
    {
      when: "{{platform !== 'win32'}}",
      method: "shell.run",
      params: {
        build: true,
        env: {
          DISTUTILS_USE_SDK: "1"
        },
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r ../requirements.txt",
          "pip install -e detectron2/projects/DensePose"
        ]
      }
    }
  ]
}
