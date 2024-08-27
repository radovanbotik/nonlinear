import { cn } from "@/app/lib/helpers";

export default function Reddit({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("", className)}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M10.24 13.6C10.0818 13.6 9.92711 13.5531 9.79555 13.4652C9.66399 13.3773 9.56145 13.2523 9.5009 13.1061C9.44035 12.96 9.42451 12.7991 9.45538 12.6439C9.48624 12.4887 9.56244 12.3462 9.67432 12.2343C9.7862 12.1224 9.92875 12.0462 10.0839 12.0154C10.2391 11.9845 10.4 12.0003 10.5461 12.0609C10.6923 12.1214 10.8173 12.224 10.9052 12.3555C10.9931 12.4871 11.04 12.6418 11.04 12.8C11.04 12.9051 11.0193 13.0091 10.9791 13.1061C10.9389 13.2032 10.88 13.2914 10.8057 13.3657C10.7314 13.44 10.6432 13.4989 10.5461 13.5391C10.4491 13.5793 10.3451 13.6 10.24 13.6ZM20 12C20 13.5823 19.5308 15.129 18.6518 16.4446C17.7727 17.7602 16.5233 18.7855 15.0615 19.391C13.5997 19.9965 11.9911 20.155 10.4393 19.8463C8.88743 19.5376 7.46197 18.7757 6.34315 17.6569C5.22433 16.538 4.4624 15.1126 4.15372 13.5607C3.84504 12.0089 4.00347 10.4003 4.60897 8.93853C5.21447 7.47672 6.23985 6.22729 7.55544 5.34824C8.87103 4.46919 10.4178 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12ZM15.73 10.67C15.4543 10.6862 15.1943 10.8038 15 11C14.1775 10.4564 13.2158 10.1613 12.23 10.15L12.79 7.62L14.58 8.02C14.5787 8.12458 14.5981 8.22839 14.6372 8.32539C14.6764 8.4224 14.7343 8.51067 14.8078 8.58509C14.8813 8.65951 14.9689 8.7186 15.0654 8.75892C15.1619 8.79925 15.2654 8.82001 15.37 8.82C15.5831 8.81737 15.7866 8.73087 15.9363 8.57925C16.0861 8.42763 16.17 8.2231 16.17 8.01C16.176 7.82715 16.1183 7.6479 16.0069 7.50284C15.8954 7.35777 15.737 7.25589 15.5588 7.21458C15.3806 7.17327 15.1936 7.1951 15.0296 7.27633C14.8657 7.35756 14.7351 7.49317 14.66 7.66L12.66 7.22C12.6124 7.21087 12.5631 7.22027 12.5222 7.2463C12.4813 7.27233 12.4519 7.313 12.44 7.36L11.82 10.15C10.8346 10.1641 9.87368 10.4589 9.05 11C8.94175 10.8882 8.81043 10.8014 8.66518 10.7456C8.51993 10.6898 8.36426 10.6663 8.20902 10.6769C8.05378 10.6874 7.9027 10.7316 7.76631 10.8065C7.62993 10.8814 7.51152 10.9852 7.41934 11.1105C7.32717 11.2359 7.26344 11.3799 7.23261 11.5324C7.20178 11.6849 7.20458 11.8423 7.24082 11.9936C7.27706 12.1449 7.34586 12.2865 7.44244 12.4085C7.53902 12.5305 7.66104 12.63 7.8 12.7C7.78471 12.8663 7.78471 13.0337 7.8 13.2C7.8 14.89 9.71 16.27 12.06 16.27C14.41 16.27 16.32 14.89 16.32 13.2C16.3204 13.0282 16.3002 12.857 16.26 12.69C16.4621 12.5755 16.6215 12.3984 16.714 12.1854C16.8066 11.9724 16.8274 11.7351 16.7732 11.5092C16.719 11.2834 16.5927 11.0813 16.4136 10.9335C16.2344 10.7858 16.012 10.7003 15.78 10.69L15.73 10.67ZM13.51 14.42C13.0606 14.7023 12.5407 14.852 12.01 14.852C11.4793 14.852 10.9594 14.7023 10.51 14.42C10.4731 14.3863 10.425 14.3676 10.375 14.3676C10.325 14.3676 10.2769 14.3863 10.24 14.42C10.2206 14.4378 10.2051 14.4594 10.1945 14.4835C10.1839 14.5076 10.1785 14.5337 10.1785 14.56C10.1785 14.5863 10.1839 14.6124 10.1945 14.6365C10.2051 14.6606 10.2206 14.6822 10.24 14.7C10.7652 15.0564 11.3853 15.2469 12.02 15.2469C12.6547 15.2469 13.2748 15.0564 13.8 14.7C13.8194 14.6822 13.8349 14.6606 13.8455 14.6365C13.8561 14.6124 13.8616 14.5863 13.8616 14.56C13.8616 14.5337 13.8561 14.5076 13.8455 14.4835C13.8349 14.4594 13.8194 14.4378 13.8 14.42C13.7813 14.4003 13.7588 14.3847 13.7339 14.374C13.709 14.3633 13.6821 14.3577 13.655 14.3577C13.6279 14.3577 13.601 14.3633 13.5761 14.374C13.5512 14.3847 13.5287 14.4003 13.51 14.42ZM13.76 12C13.6018 12 13.4471 12.0469 13.3155 12.1348C13.184 12.2227 13.0814 12.3477 13.0209 12.4939C12.9604 12.64 12.9445 12.8009 12.9754 12.9561C13.0062 13.1113 13.0824 13.2538 13.1943 13.3657C13.3062 13.4776 13.4487 13.5538 13.6039 13.5846C13.7591 13.6155 13.92 13.5997 14.0662 13.5391C14.2123 13.4786 14.3373 13.376 14.4252 13.2445C14.5131 13.1129 14.56 12.9582 14.56 12.8C14.56 12.5878 14.4757 12.3843 14.3257 12.2343C14.1757 12.0843 13.9722 12 13.76 12Z"
          fill="#000000"
        ></path>{" "}
      </g>
    </svg>
  );
}
