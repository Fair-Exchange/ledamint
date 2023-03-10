import React from 'react';
import ContentLoader from 'react-content-loader';

export const CardLoader = () => (
  <ContentLoader
    speed={2}
    width={223}
    height={400}
    viewBox="0 0 250 400"
    backgroundColor="#0c0c0c"
    foregroundColor="#595959"
  >
    <rect x="9" y="0" rx="14" ry="14" width="232" height="240" />
    <circle cx="39" cy="296" r="15" />
    <rect x="24" y="251" rx="0" ry="6" width="123" height="21" />
    <rect x="24" y="322" rx="6" ry="6" width="44" height="25" />
    {/* <rect x="9" y="320" rx="5" ry="6" width="232" height="54" />  */}
  </ContentLoader>
);

export const ThreeDots = ({ style, isWrapperLarger }: { style?: React.CSSProperties, isWrapperLarger?: boolean }) => (
  <>

    {isWrapperLarger ? (
      <ContentLoader
        viewBox="0 0 400 304"
        height={980}
        width={800}
        backgroundColor="transparent"
        style={{
          width: '50%',
          height: 'auto',
          margin: 'auto',
          ...style,
        }}
      >
        <path stroke="null" id="svg_1" fill="#ff7f00" d="m160.72374,51.36199c-23.82336,0 -43.20154,19.37022 -43.20154,43.18388l0,71.76831l71.79809,0c23.82336,0 43.20189,-19.37022 43.20189,-43.18388l0,-71.76831l-71.79844,0zm56.64823,71.76311c0,15.46646 -12.58384,28.0451 -28.05688,28.0451l-43.32867,0l39.77268,-53.14939l-53.09224,39.78792l0,-43.26286c0,-15.46161 12.58384,-28.0451 28.05688,-28.0451l56.64823,0l0,56.62433z" />
      </ContentLoader>
    ) : (
      <ContentLoader
        viewBox="0 0 280 280"
        height={280}
        width={280}
        backgroundColor="transparent"
        style={{
          width: '100%',
          height: 'auto',
          margin: 'auto',
          ...style,
        }}
      >
        <path stroke="null" id="svg_1" fill="#ff7f00" d="m126.72374,77.36199c-23.82336,0 -43.20154,19.37022 -43.20154,43.18388l0,71.76831l71.79809,0c23.82336,0 43.20189,-19.37022 43.20189,-43.18388l0,-71.76831l-71.79844,0zm56.64823,71.76311c0,15.46646 -12.58384,28.0451 -28.05688,28.0451l-43.32867,0l39.77268,-53.14939l-53.09224,39.78792l0,-43.26286c0,-15.46161 12.58384,-28.0451 28.05688,-28.0451l56.64823,0l0,56.62433z" />
      </ContentLoader>
    )}


  </>
);
