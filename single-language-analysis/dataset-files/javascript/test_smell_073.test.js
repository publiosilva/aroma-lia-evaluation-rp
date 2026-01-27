const { expect } = require('jest');

describe('OOoBeanTest', () => {
    it("test_smell_073", async () => {
        let f = null;
        let capturer = null;
        try {
            f = new WriterFrame(100, 100, 500, 500, false, connection.getComponentContext());
            if (!f.checkUnoFramePosition()) {
                throw new Error("Sizing error: Client are of Java frame does not match the UNO window.");
            }
            capturer = new ScreenComparer(100, 100, 500, 500);

            // Minimize Window and back
            f.goToStart();
            f.pageDown();
            await new Promise(resolve => setTimeout(resolve, 1000));
            for (let i = 0; i < 3; i++) {
                capturer.reset();
                capturer.grabOne(f.getClientArea());
                f.setExtendedState(Frame.ICONIFIED);
                await new Promise(resolve => setTimeout(resolve, getSleepTime(200)));
                if (!f.checkUnoFramePosition()) {
                    throw new Error("Sizing error: Frame was iconified.");
                }
                f.setExtendedState(Frame.NORMAL);
                await new Promise(resolve => setTimeout(resolve, getSleepTime(200)));
                if (!f.checkUnoFramePosition()) {
                    throw new Error("Sizing error: Frame size set back to normal after it was iconified.");
                }
                capturer.grabTwo(f.getClientArea());
                if (!capturer.compare()) {
                    throw new Error("Painting error: Minimize (iconify) frame and back to normal size.");
                    capturer.writeImages();
                }
            }

            // Maximize Window and back to normal
            for (let i = 0; i < 3; i++) {
                capturer.reset();
                capturer.grabOne(f.getClientArea());
                f.setExtendedState(Frame.MAXIMIZED_BOTH);
                await new Promise(resolve => setTimeout(resolve, getSleepTime(200)));
                if (!f.checkUnoFramePosition()) {
                    throw new Error("Sizing error: Frame maximized.");
                }
                f.setExtendedState(Frame.NORMAL);
                await new Promise(resolve => setTimeout(resolve, getSleepTime(200)));
                if (!f.checkUnoFramePosition()) {
                    throw new Error("Sizing error: Frame set from maximized to normal.");
                }
                capturer.grabTwo(f.getClientArea());
                if (!capturer.compare()) {
                    throw new Error("Painting error: Maximize frame and back to normal size");
                    capturer.writeImages();
                }
            }

            // Move Window top left
            capturer.reset();
            capturer.grabOne(f.getClientArea());
            const oldPosition = f.getBounds();
            f.setBounds(0, 0, oldPosition.width, oldPosition.height);
            await new Promise(resolve => setTimeout(resolve, getSleepTime(200)));
            if (!f.checkUnoFramePosition()) {
                throw new Error("Sizing error: Frame moved.");
            }

            capturer.grabTwo(f.getClientArea());
            if (!capturer.compare()) {
                throw new Error("Painting error: Move frame to a different position.");
                capturer.writeImages();
            }

            // Move Window down
            const dim = Toolkit.getDefaultToolkit().getScreenSize();
            const maxY = dim.height - f.getBounds().height;

            let curY = 0;
            while (curY < maxY) {
                capturer.reset();
                capturer.grabOne(f.getClientArea());
                oldPosition = f.getBounds();
                f.setBounds(0, curY, oldPosition.width, oldPosition.height);
                capturer.grabTwo(f.getClientArea());
                if (!capturer.compare()) {
                    throw new Error("Painting error: Move frame to a different position.");
                    capturer.writeImages();
                }
                curY += 50;
                await new Promise(resolve => setTimeout(resolve, getSleepTime(200)));
            }

            // Obscure the window and make it visible again
            oldPosition = f.getBounds();

            const pos = new Rectangle(oldPosition.x - 50, oldPosition.y - 50,
                oldPosition.width, oldPosition.height);
            const coverFrame = new Frame();
            coverFrame.setBounds(pos);
            capturer.reset();
            capturer.grabOne(f.getClientArea());

            for (let i = 0; i < 3; i++) {
                coverFrame.setVisible(true);
                await new Promise(resolve => setTimeout(resolve, getSleepTime(200)));
                f.toFront();
                await new Promise(resolve => setTimeout(resolve, getSleepTime(200)));
                if (!f.checkUnoFramePosition()) {
                    throw new Error("Sizing error: Frame moved from back to front.");
                }

                capturer.grabTwo(f.getClientArea());
                if (!capturer.compare()) {
                    throw new Error("Painting error: Move frame to back and to front.");
                    capturer.writeImages();
                }
            }

            coverFrame.dispose();
        } finally {
            if (f != null) {
                f.dispose();
            }
        }
    });
});