import React, { useEffect } from "react";
import axios from "axios";
export default function Test() {
  useEffect(() => {
    var data = JSON.stringify({
      postId: "63337673600a1e28e15b2327",
    });

    var config = {
      method: "get",
      url: "http://localhost:3113/comm/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return <div>Test</div>;
}
