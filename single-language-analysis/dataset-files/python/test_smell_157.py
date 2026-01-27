# Original URL: https://github.com/bhuvesh-bansal/LoopAiApi/blob/e9de96fcb2d1e272ee9fc59fe2158cbacf3a88db/test_main.py#L29-L57

def test_smell_157():
    # First request with MEDIUM priority
    response1 = client.post(
        "/ingest",
        json={"ids": [1, 2, 3, 4, 5], "priority": "MEDIUM"}
    )
    ingestion_id1 = response1.json()["ingestion_id"]
    
    # Second request with HIGH priority
    response2 = client.post(
        "/ingest",
        json={"ids": [6, 7, 8, 9], "priority": "HIGH"}
    )
    ingestion_id2 = response2.json()["ingestion_id"]
    
    # Wait for some processing
    time.sleep(6)
    
    # Check status of both requests
    status1 = client.get(f"/status/{ingestion_id1}")
    status2 = client.get(f"/status/{ingestion_id2}")
    
    # HIGH priority request should have more completed batches
    completed_batches1 = sum(1 for batch in status1.json()["batches"] 
                           if batch["status"] == BatchStatus.COMPLETED)
    completed_batches2 = sum(1 for batch in status2.json()["batches"] 
                           if batch["status"] == BatchStatus.COMPLETED)
    
    assert completed_batches2 >= completed_batches1