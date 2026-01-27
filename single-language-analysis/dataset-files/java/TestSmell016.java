// Original URL: https://github.com/zevichen/base/blob/5a7e50aab41c5949b91fd96a175cfdcd85812608/src/main/java/com/czw/base/thread/MainTest.java#L29-L52

public class TestSmell016 {
	@Test
	public void stopThread() throws InterruptedException{
		Thread t = new Thread(new Runnable() {
			public void run() {
				int i = 0;
				while(!stop){
					i++;
					log.info("loop thread {}",i);
					try {
						Thread.sleep(700);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				log.info("stopThread[Thread:{}]: count i is {}",Thread.currentThread().getName(),i);
			}
		});
		t.start();
		
		Thread.sleep(7000);
		stop = true;
		log.info("stopThread[Thread:{}]: stopped!",t.getName());
	
	}
}
